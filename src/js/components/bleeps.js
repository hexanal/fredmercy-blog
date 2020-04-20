import throttle from 'lodash.throttle';
import Mousetrap from 'mousetrap';
import {
	Master,
	Synth,
	Compressor,
	BitCrusher,
	Tremolo,
	FeedbackDelay,
	Filter
} from 'tone';
import Config from 'utils/Config';
import Storage from 'utils/Storage';

export default function() {
	this.global = true;
	this.state = {
		container: null,
		enableSoundsBtn: null,
		enabled: false,
		loaded: false,
		mouseDown: false,
		mouseMoveStep: 0,
	};

	this.listen = (id, payload) => {
		switch (id) {
			case 'TOGGLE_BLEEPS':
				this.toggleSounds();
				break;
			case 'PLAY_SOUND': // if components know who to call :)
				this.play(payload);
				break;
			case 'PAGE_CHANGED':
				this.hookEventListeners(payload.next.container);
				break;
			case 'MENU_TOGGLED':
				const sound = payload ? 'gnuf' : 'gnaf';
				setTimeout(() => this.play(sound), 50);
				setTimeout(() => this.play(sound), 100);
				setTimeout(() => this.play(sound), 150);
			default:
				break;
		}
	}

	this.onMount = function() {
		if ( !Config.featureEnabled('useBleeps') ) return;

		this.state.container = document.querySelector('[data-js="bleeps"]');
		this.state.bleepStatus = document.querySelector('[data-js="bleeps-status"]');

		this.state.enableSoundsBtn = document.querySelector('[data-js="enable-sounds"]');
		this.state.enableSoundsBtn.addEventListener('click', () => this.toggleSounds());

		Mousetrap.bind('tab', () => this.play('riil', 'F5') );
		Mousetrap.bind('shift+tab', () => {
			this.play('riil', 'G5');
			setTimeout(() => this.play('riil', 'F#5'), 70);
		});
		Mousetrap.bind('up', () => this.play('tick', 'F#4') );
		Mousetrap.bind('down', () => this.play('tick', 'C#5') );
		Mousetrap.bind('escape', () => this.play('canc') );
		Mousetrap.bind('backspace', () => this.play('blink') );
		Mousetrap.bind([
			'space',
		], () => {
			setTimeout(() => this.play('tick', 'A2'), 30);
			setTimeout(() => this.play('tick', 'A2'), 90);
			setTimeout(() => this.play('tick', 'A2'), 150);

			return false;
		});
		Mousetrap.bind([
			'enter',
		 ], () => {
			setTimeout(() => this.play('tick', 'A2'), 30);
			setTimeout(() => this.play('tick', 'A2'), 90);
			setTimeout(() => this.play('tick', 'A2'), 150);
		});

		document.addEventListener('keyup', e => {
			const { code } = e;
			if ( !code.includes('Key') ) return;
			this.play('blarp');
		});

		this.init()
			.then(() => {
				if ( this.state.loaded && Storage.flag('sounds_enabled') ) {
					this.enable();
				} else {
					this.disable();
				}
			});
	}

	this.init = function() {
		if (this.state.loaded) return Promise.resolve(true); // loaded already

		return new Promise((resolve) => {
			this.initFX();
			this.initOscillators();
			this.initScroll();
			this.initResize();
			this.hookEventListeners(document);

			this.state.sounds = this.getSoundBank();
			this.state.loaded = true;

			resolve(this.state.loaded);
		});
	}

	this.toggleSounds = function() {
		if (!this.state.enabled) {
			return this.init()
				.then(() => this.enable());
		}

		this.disable();
	}

	this.enable = () => {
		this.state.enabled = true;
		this.state.container.classList.add('state-sounds-enabled');

		Storage.set('sounds_enabled', 1);
		Master.mute = false;
	}

	this.disable = () => {
		this.state.enabled = false;
		this.state.container.classList.remove('state-sounds-enabled');

		Storage.set('sounds_enabled', 0);
		Master.mute = true;
	}

	this.play = (soundId, note = false) => {
		if (!this.state.enabled || !this.state.sounds) return;

		return this.init()
			.then(() => {
				const fromBank = this.state.sounds[soundId];
				const sound = typeof fromBank === 'function' && note
					? fromBank(note)
					: fromBank;

				if (!sound) {
					console.warn(`Could not find sound id: "${soundId}"`);
					return false;
				}

				this.bleep(sound);
			});
	}

	this.bleep = (sound) => {
		const { osc, note, duration } = sound;
		const synth = this.OSCILLATORS[osc];

		if (!synth) {
			console.error(`Synth ID: "${osc}" doesn't exist`);
		}

		synth.triggerAttackRelease(note, duration);
	}

	this.getSoundBank = function() {
		return {
			tick: note => ({ osc: 'filteredSquare', note, duration: 0.02 }),

			boop: { osc: 'triangle', note: 'B3', duration: 0.02 },
			blarp: { osc: 'triangle', note: 'D3', duration: 0.03 },
			blink: { osc: 'triangle', note: 'D4', duration: 0.05 },

			woaw: { osc: 'sine', note: 'C2', duration: 0.18 },
			womp: { osc: 'sine', note: 'A#1', duration: 0.18 },

			kree: { osc: 'saw', note: 'A2', duration: 0.1 },
			gnuf: { osc: 'sine', note: 'G5', duration: 0.012 },
			gnaf: { osc: 'sine', note: 'G#5', duration: 0.012 },

			gong: { osc: 'gong', note: 'C5', duration: 0.2 },
			canc: { osc: 'pulse', note: 'F1', duration: 0.02 },
			riil: note => ({ osc: 'sine', note, duration: 0.02 }),

			'select-hover': { osc: 'sine', note: 'D#3', duration: 0.075 },
			'select-click': { osc: 'sine', note: 'E3', duration: 0.1 },
			'select-change': { osc: 'sineWithTremolo', note: 'G#3', duration: 0.3 },
		};
	}

	this.initFX = function() {
		this.EFFECTS = {
			compressor: new Compressor({
				threshold: -6,
				ratio: 3,
				attack: 0.5,
				release: 0.1
			}),
			quickFilter: new Filter({ type: 'lowpass', frequency: 300, rolloff: -12, Q: 3, gain: 0 }),
			filter: new Filter({ type: 'lowpass', frequency: 80, rolloff: -12, Q: 1, gain: 0 }),
			crush: new BitCrusher(8),
			tremolo: new Tremolo({frequency: 20, depth: 0.7, spread: 0, type: 'square'}).start(),
			delay: new FeedbackDelay(0.075, 0.25),
		};
	}

	this.initOscillators = function() {
		// # SINE WAVE
		const sine = new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 },
		})
			.chain(this.EFFECTS.crush, /* this.EFFECTS.quickFilter, */Master);

		// # SINE WITH TREM
		const sineWithTremolo =  new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 }
		})
			.chain(this.EFFECTS.crush, this.EFFECTS.tremolo, Master);

		const filteredSquare = new Synth({
			oscillator : { type : 'triangle' },
			envelope : { attack : 0.002, decay : 0.1, sustain : 1, release : 0.01 }
		})
			.chain(this.EFFECTS.crush, /* this.EFFECTS.quickFilter, */Master);
		filteredSquare.portamento = 0.2;

		// # TRIANGLE
		const triangle = new Synth({
			oscillator : { type : 'triangle' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(this.EFFECTS.crush, /* this.EFFECTS.quickFilter, */Master);

		// # GONG
		const gong = new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.005, decay : 0.05, sustain : 0.3, release : 1.2 }
		})
			.chain(this.EFFECTS.crush, Master);

		// # SAWTOOTH
		const saw = new Synth({
			oscillator : { type : 'sawtooth' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(this.EFFECTS.crush, this.EFFECTS.filter, Master);

		// # SAW WITH TREMOLO
		const sawWithTremolo = new Synth({
			oscillator : { type : 'sawtooth' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(this.EFFECTS.crush, this.EFFECTS.tremolo, this.EFFECTS.filter, Master);

		const pulse = new Synth({
			oscillator: { type: 'sine' },
			envelope : { attack : 0.01, decay : 0.02, sustain : 0.3, release : 0.5 }
		})
			.chain(this.EFFECTS.crush, this.EFFECTS.tremolo, Master);

		this.OSCILLATORS = {
			sine,
			sineWithTremolo,
			filteredSquare,
			triangle,
			gong,
			saw,
			sawWithTremolo,
			pulse,
		};
	}

	/**
	 * * DOM Nodes to target with sounds
	 */
	this.hookEventListeners = function(el) {
		const links = el.querySelectorAll('a');
		const buttons = el.querySelectorAll('button');
		const selects = el.querySelectorAll('select');

		links.forEach(link => {
			link.addEventListener('mouseover', e => this.play('boop'));
			link.addEventListener('mousedown', e => this.play('blink') );
		});
		buttons.forEach(button => {
			button.addEventListener('mouseover', e => this.play('boop'));
			button.addEventListener('mousedown', e => this.play('blarp'));
		});
		selects.forEach(select => {
			select.addEventListener('mouseover', e => this.play('select-hover'));
			select.addEventListener('click', e => this.play('select-click'));
			select.addEventListener('change', e => this.play('select-change'));
		});
	}

	this.initScroll = function() {
		const onScroll = throttle(e => {
			const baseFreq = 300;
			const freqOffset = 200;
			const ratio = (window.scrollY / document.documentElement.scrollHeight);
			const freq = (ratio * baseFreq) + freqOffset;

			if (ratio <= 0) return;

			this.play('riil', freq);
		}, 50);

		document.addEventListener('scroll', onScroll);
	}

	this.initResize = function() {
		const onResize = throttle(e => {
			const baseFreq = 100;
			const freqOffset = 300;
			const ratioFrom = 1000;
			const ratio = (
				window.innerWidth / ratioFrom
				+
				window.innerHeight / ratioFrom
			);
			const freq = (ratio * baseFreq) + freqOffset;

			if (ratio <= 0) return;

			this.play('tick', freq);
		}, 20);

		window.addEventListener('resize', onResize);
	}
}
