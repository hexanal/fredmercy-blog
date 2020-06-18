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
import Storage from 'tools/Storage';

const EFFECTS = {
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

let loaded = false;

export default function({ element, control, messaging }) {
	if (loaded) return; loaded = true;

	const state = {
		enabled: false,
		loaded: false,
		mouseDown: false,
		mouseMoveStep: 0,
	};

	const initEvents = function() {
		Mousetrap.bind('tab', () => play('riil', 'F5') );
		Mousetrap.bind('shift+tab', () => {
			play('riil', 'G5');
			setTimeout(() => play('riil', 'F#5'), 70);
		});
		Mousetrap.bind('up', () => play('tick', 'F#4') );
		Mousetrap.bind('down', () => play('tick', 'C#5') );
		Mousetrap.bind('escape', () => play('canc') );
		Mousetrap.bind('backspace', () => play('blink') );
		Mousetrap.bind([
			'space',
		], () => {
			setTimeout(() => play('tick', 'A2'), 30);
			setTimeout(() => play('tick', 'A2'), 90);
			setTimeout(() => play('tick', 'A2'), 150);

			return false;
		});
		Mousetrap.bind([
			'enter',
			], () => {
			setTimeout(() => play('tick', 'A2'), 30);
			setTimeout(() => play('tick', 'A2'), 90);
			setTimeout(() => play('tick', 'A2'), 150);
		});

		document.addEventListener('keyup', e => {
			const { code } = e;
			if ( !code.includes('Key') ) return;
			play('blarp');
		});
	};

	const init = function() {
		if (state.loaded) return Promise.resolve(true); // loaded already

		return new Promise((resolve) => {
			initEvents();
			initOscillators();
			initScroll();
			initResize();
			hookEventListeners(document);

			state.sounds = getSoundBank();
			state.loaded = true;

			resolve(state.loaded);
		});
	}

	const toggleSounds = function() {
		if (!state.enabled) {
			return init()
				.then(() => enable());
		}

		disable();
	}

	const enable = () => {
		state.enabled = true;
		element.classList.add('state-sounds-enabled');

		Storage.set('sounds_enabled', 1);
		Master.mute = false;
	}

	const disable = () => {
		state.enabled = false;
		element.classList.remove('state-sounds-enabled');

		Storage.set('sounds_enabled', 0);
		Master.mute = true;
	}

	const play = (soundId, note = false) => {
		if (!state.enabled || !state.sounds) return;

		return init()
			.then(() => {
				const fromBank = state.sounds[soundId];
				const sound = typeof fromBank === 'function' && note
					? fromBank(note)
					: fromBank;

				if (!sound) {
					console.warn(`Could not find sound id: "${soundId}"`);
					return false;
				}

				bleep(sound);
			});
	}

	const playBurst = (soundId, note = false, times = 1, delay = 50) => {
		for (let i = 0; i <= times; i++) {
			setTimeout( () => play(soundId, note), (delay * i) );
		}
	}

	const bleep = (sound) => {
		const { osc, note, duration } = sound;
		const synth = state.oscillators[osc];

		if (!synth) console.error(`Synth ID: "${osc}" doesn't exist`);

		synth.triggerAttackRelease(note, duration);
	}

	const getSoundBank = function() {
		return {
			tick: note => ({ osc: 'filteredSquare', note, duration: 0.02 }),
			blarpNote: note => ({ osc: 'triangle', note, duration: 0.02 }),

			boop: { osc: 'triangle', note: 'B3', duration: 0.02 },
			blarp: { osc: 'triangle', note: 'D3', duration: 0.03 },
			blink: { osc: 'triangle', note: 'D4', duration: 0.05 },

			woaw: { osc: 'sine', note: 'C2', duration: 0.18 },
			womp: { osc: 'sine', note: 'A#1', duration: 0.18 },

			kree: { osc: 'saw', note: 'A2', duration: 0.1 },
			gnuf: { osc: 'sine', note: 'G5', duration: 0.012 },
			gnaf: { osc: 'sine', note: 'G#5', duration: 0.012 },

			gong: { osc: 'gong', note: 'C5', duration: 0.02 },
			canc: { osc: 'pulse', note: 'F1', duration: 0.02 },
			riil: note => ({ osc: 'sine', note, duration: 0.02 }),

			'select-hover': { osc: 'sine', note: 'D#3', duration: 0.075 },
			'select-click': { osc: 'sine', note: 'E3', duration: 0.1 },
			'select-change': { osc: 'sineWithTremolo', note: 'G#3', duration: 0.3 },
		};
	};

	const initOscillators = function() {
		// # SINE WAVE
		const sine = new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 },
		})
			.chain(EFFECTS.crush, Master);

		// # SINE WITH TREM
		const sineWithTremolo =  new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 }
		})
			.chain(EFFECTS.crush, EFFECTS.tremolo, Master);

		const filteredSquare = new Synth({
			oscillator : { type : 'triangle' },
			envelope : { attack : 0.002, decay : 0.1, sustain : 1, release : 0.01 }
		})
			.chain(EFFECTS.crush, Master);
		filteredSquare.portamento = 0.2;

		// # TRIANGLE
		const triangle = new Synth({
			oscillator : { type : 'triangle' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(EFFECTS.crush, Master);

		// # GONG
		const gong = new Synth({
			oscillator : { type : 'sine' },
			envelope : { attack : 0.007, decay : 0.02, sustain : 0.3, release : 0.04 }
		})
			.chain(EFFECTS.crush, Master);

		// # SAWTOOTH
		const saw = new Synth({
			oscillator : { type : 'sawtooth' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(EFFECTS.crush, EFFECTS.filter, Master);

		// # SAW WITH TREMOLO
		const sawWithTremolo = new Synth({
			oscillator : { type : 'sawtooth' },
			envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
		})
			.chain(EFFECTS.crush, EFFECTS.tremolo, EFFECTS.filter, Master);

		const pulse = new Synth({
			oscillator: { type: 'sine' },
			envelope : { attack : 0.01, decay : 0.02, sustain : 0.3, release : 0.5 }
		})
			.chain(EFFECTS.crush, EFFECTS.tremolo, Master);

		state.oscillators = {
			sine,
			sineWithTremolo,
			filteredSquare,
			triangle,
			gong,
			saw,
			sawWithTremolo,
			pulse,
		};
	};

	/**
	 * * DOM Nodes to target with sounds
	 */
	const hookEventListeners = function(el) {
		const links = el.querySelectorAll('a');
		const buttons = el.querySelectorAll('button');
		const selects = el.querySelectorAll('select');

		links.forEach(link => {
			link.addEventListener('mouseover', e => play('boop'));
			link.addEventListener('mousedown', e => play('blink') );
		});
		buttons.forEach(button => {
			button.addEventListener('mouseover', e => play('boop'));
			button.addEventListener('mousedown', e => play('blarp'));
		});
		selects.forEach(select => {
			select.addEventListener('mouseover', e => play('select-hover'));
			select.addEventListener('click', e => play('select-click'));
			select.addEventListener('change', e => play('select-change'));
		});
	}

	const initScroll = function() {
		const onScroll = throttle(e => {
			const baseFreq = 300;
			const freqOffset = 200;
			const ratio = (window.scrollY / document.documentElement.scrollHeight);
			const freq = (ratio * baseFreq) + freqOffset;

			if (ratio <= 0) return;

			play('riil', freq);
		}, 50);

		document.addEventListener('scroll', onScroll);
	};

	const initResize = function() {
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

			play('tick', freq);
		}, 20);

		window.addEventListener('resize', onResize);
	};

	messaging.subscribe('TOGGLE_BLEEPS', toggleSounds);
	messaging.subscribe('PLAY_SOUND', play);
	messaging.subscribe('TOGGLE_HELP', () => playBurst('gong', false, 3, 70) );
	messaging.subscribe('PAGE_CHANGED', ({next}) => hookEventListeners(next.container) );
	messaging.subscribe('MENU_TOGGLED', toggled => {
		const sound = toggled ? 'gnuf' : 'gnaf';
		playBurst(sound, false, 3, 50, 50);
	});
	messaging.subscribe('A11Y_SET_LARGE_FONT', big => {
		const notes = big ? ['C4', 'C#4', 'D4'] : ['D3', 'C#3', 'C3'];
		const burst = 3;
		const delay = 40;
		const delayBetweenBursts = 170;

		notes.map((note, i) => {
			setTimeout( () => playBurst('tick', note, burst, delay), (delayBetweenBursts * (i + 1)) );
		});
	});


	// let's go...
	if ( Storage.flag('sounds_enabled') ) {
		init()
			.then(enable);
	}

	Mousetrap.bind('s', toggleSounds);
	control['enable-sounds'].addEventListener('click', toggleSounds);
}

