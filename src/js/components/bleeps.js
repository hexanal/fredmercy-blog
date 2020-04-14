import Utils from '../core/Utils';

const WAD_PATH = Utils.config.getLibraryURL('wad.min.js');
const DEFAULT_VOLUME = 0.75;

export default function() {
	this.global = true;
	this.state = {
		container: null,
		enableSoundsBtn: null,
		enabled: false,
		loaded: false,
		loadingLib: false,
		soundLabel: null,
		storage: window.localStorage,
	};

	this.listen = (id, payload) => {
		switch (id) {
			case 'PLAY_SOUND': // if components know who to call :)
				this.play(payload);
				break;
			case 'PAGE_LEAVE':
				this.play('woaw');
				this.play('womp');
				break;
			case 'PAGE_CHANGE':
				this.hookEvents(payload.container);
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

	this.onMount = function(component) {
		if ( !Utils.config.featureEnabled('useBleeps') ) return;

		this.state.container = component.querySelector('[data-js="bleeps"]');
		this.state.enableSoundsBtn = component.querySelector('[data-js="enable-sounds"]');
		this.state.bleepStatus = component.querySelector('[data-js="bleeps-status"]');

		this.state.enabled = (this.state.storage.getItem('sounds_enabled') > 0);

		this.state.enableSoundsBtn.addEventListener('click', () => {
			if (this.state.loaded) return this.toggleSounds();

			this.hookEvents(component)
				.then(() => this.enable());
		});
	}

	this.initOnUserInteraction = e => {
		if (!this.state.loading && !this.state.loaded) {
			console.log('init on interaction');
		}
	}

	this.toggleSounds = function() {
		if (!this.state.enabled) {
			this.enable();
		} else {
			this.disable();
		}
	}

	this.enable = () => {
		this.state.enabled = true;
		this.state.storage.setItem('sounds_enabled', 1);
		this.state.container.classList.add('state-sounds-enabled');
		Wad.setVolume(DEFAULT_VOLUME);
	}

	this.disable = () => {
		this.state.enabled = false;
		this.state.storage.setItem('sounds_enabled', 0);
		this.state.container.classList.remove('state-sounds-enabled');
		Wad.setVolume(0);
	}

	this.load = function() {
		if (this.state.loaded || this.state.loading) return Promise.resolve();

		this.state.loading = true;

		return Utils.dom
			.loadJS(WAD_PATH)
			.then(() => {
				this.state.loading = false;
				this.state.loaded = true;
				this.loadSounds();
			});
	}

	this.loadSounds = function() {
		this.state.sounds = getWadSoundbank();
	}

	this.hookEvents = function(container) {
		return this.load()
			.then(() => {
				const links = container.querySelectorAll('a');
				const buttons = container.querySelectorAll('button');
				const selects = container.querySelectorAll('select');

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
			});
	}

	this.play = soundId => {
		if (!this.state.enabled || !this.state.sounds) return;
		const sound = this.state.sounds[soundId];

		if (!sound) {
			console.warn(`Could not find sound id: "${soundId}"`);
			return false;
		}

		return sound.play();
	}
}

const SOUND_PRESETS = {
	shortEnv: {
		attack: 0,
		decay: 0.05,
		sustain: 0.2,
		hold: 0.01,
		release: 0
	},
	mediumEnv: {
		attack: 0.02,
		decay: 0.09,
		sustain: 0.2,
		hold: 0.02,
		release: 0
	},

	quickFilter: {
		type: 'lowpass',
		frequency : 600,
		q: 1,
		env: {
			frequency: 800,
			attack: 0.07
		}
	},
	midFilter: {
		type: 'lowpass',
		frequency : 300,
		q: 1,
		env: {
			frequency: 1000,
			attack: 0.2
		}
	},
	tuna: {
		Bitcrusher: {
			bits: 8, //1 to 16
			normfreq: 0.2, //0 to 1
			bufferSize: 512 //256 to 16384
		},
		Filter: {
			frequency: 6000, //20 to 22050
			Q: 1, //0.001 to 100
			gain: 0, //-40 to 40 (in decibels)
			filterType: "lowpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
			bypass: 0
		},
	},
	lowpassFilter: {
		frequency: 600,
		Q: 2,
		gain: 5,
		filterType: "lowpass",
		bypass: 0
	}
};

function getWadSoundbank() {
	const { shortEnv, mediumEnv, quickFilter, midFilter, tuna, lowpassFilter } = SOUND_PRESETS;

	return {
		'select-hover': new Wad({
			tuna,
			source : 'sawtooth',
			pitch: 'D#3',
			env: shortEnv,
		}),

		'select-click': new Wad({
			tuna,
			source : 'sawtooth',
			pitch: 'G4',
			env: {
				attack: 0,
				decay: 0,
				sustain: 1,
				hold: 0.02,
				release: 0.1
			},
			filter: {
				type: 'lowpass',
				frequency: 300,
				q: 2,
				env: {
					frequency: 1000,
					attack: 0.01
				},
			},
		}),

		'select-change': new Wad({
			tuna,
			source : 'sawtooth',
			pitch: 'D#4',
			env: {
				attack: 0,
				decay: 0,
				sustain: 1,
				hold: 0.02,
				release: 0.2
			},
			filter: {
				type: 'lowpass',
				frequency: 300,
				q: 2,
				env: {
					frequency: 1000,
					attack: 0.01
				},
			},
		}),

		boop: new Wad({
			tuna,
			source : 'triangle',
			pitch: 'B3',
			env: shortEnv,
			filter: quickFilter,
		}),

		blarp: new Wad({
			tuna,
			source : 'square',
			pitch: 'D3',
			env: mediumEnv,
			filter: midFilter,
		}),

		kree: new Wad.Poly()
			.add({
				tuna,
				source: 'sine',
				offset: 0.1,
				pitch: 'F5',
				env: mediumEnv,
				filter: midFilter,
			})
			.add({
				tuna,
				source: 'sine',
				offset: 0.2,
				pitch: 'F6',
				env: shortEnv,
				filter: midFilter,
			}),

		gnuf: new Wad({
			tuna,
			source : 'sine',
			pitch: 'G5',
			env: {
				attack: 0,
				decay: 0.04,
				sustain: 0.02,
				hold: 0.01,
				release: 0
			},
			filter: quickFilter,
		}),
		gnaf: new Wad({
			tuna,
			source : 'triangle',
			pitch: 'G#5',
			env: {
				attack: 0,
				decay: 0.04,
				sustain: 0.02,
				hold: 0.01,
				release: 0
			},
			filter: quickFilter,
		}),

		blink: new Wad({
			tuna,
			source : 'sawtooth',
			pitch: 'D4',
			env: mediumEnv,
			filter: midFilter,
		}),

		woaw: new Wad({
			tuna,
			source : 'square',
			pitch: 'D1',
			env: {
				attack: 0.2,
				decay: 0,
				sustain: 0.4,
				hold: 0.01,
				release: 0
			}
		}),

		womp: new Wad({
			tuna,
			source : 'sine',
			pitch: 'A3',
			env: {
				attack: 0.4,
				decay: 0,
				sustain: 0.3,
				hold: 0.01,
				release: 0
			}
		})
	};
}