import Utils from '../core/Utils';

const WAD_PATH = Utils.config.getLibraryURL('wad.min.js');
const DEFAULT_VOLUME = 0.75;

export default function() {
	this.global = true;
	this.state = {
		enableSoundsBtn: null,
		enabled: false,
		loaded: false,
		loadingLib: false,
		soundLabel: null,
		storage: window.localStorage,
	};

	this.listen = (id, payload) => {
		switch (id) {
			case 'PAGE_LEAVE':
				this.play('woosh');
				break;
			case 'PAGE_CHANGE':
				this.hookEvents(payload.container);
				break;
			default:
				break;
		}
	}

	this.onMount = function(component) {
		if ( !Utils.config.featureEnabled('useBleeps') ) return;

		this.state.enabled = (this.state.storage.getItem('sounds_enabled') > 0);
		this.state.enableSoundsBtn = component.querySelector('[data-js="enable-sounds"]');
		this.state.bleepStatus = component.querySelector('[data-js="bleeps-status"]');

		this.hookEvents(component);

		// document.addEventListener('click', this.initOnUserInteraction);
	}

	this.initOnUserInteraction = e => {
		if (!this.state.loading && !this.state.loaded) {
			console.log('init on interaction');
		}
	}

	this.toggleSounds = function() {
		if (this.state.enabled) {
			this.enable();
		} else {
			this.disable();
		}
	}

	this.enable = () => {
		this.state.enabled = true;
		this.state.storage.setItem('sounds_enabled', 1);
		this.state.bleepStatus.classList.add('state-sounds-enabled');
		Wad.setVolume(DEFAULT_VOLUME);
	}

	this.disable = () => {
		this.state.disabled = true;
		this.state.storage.setItem('sounds_enabled', 0);
		this.state.bleepStatus.classList.remove('state-sounds-enabled');
		Wad.setVolume(0);
	}

	// this.init = function() {
	// 	if (this.state.storage.getItem('sounds_enabled') > 0) ) {
	// 		this.load()
	// 			.then(

	this.load = function() {
		if (this.state.loaded) return Promise.resolve();

		this.state.loading = true;

		this.state.enableSoundsBtn.addEventListener('click', () => {
			this.toggleSounds();
		});

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
		this.load()
			.then(() => {
				const links = container.querySelectorAll('a');
				const buttons = container.querySelectorAll('button');

				links.forEach(link => {
					link.addEventListener('mouseover', e => this.play('boop'));
					link.addEventListener('mousedown', e => this.play('blink') );
				});
				buttons.forEach(button => {
					button.addEventListener('mouseover', e => this.play('boop'));
					button.addEventListener('mousedown', e => this.play('blarp'));
				});
			});
	}

	this.play = soundId => {
		if (!this.state.enabled) return;
		console.log('Playing sound:', soundId);
		this.state.sounds[soundId].play();
	}
}

const SOUND_PRESETS = {
	shortEnv: {
		attack: 0,
		decay: 0.05,
		sustain: 0.2,
		hold: 0,
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
	}
};

function getWadSoundbank() {
	return {
		boop: new Wad({
			source : 'triangle',
			pitch: 'B3',
			env: SOUND_PRESETS.shortEnv,
			filter: SOUND_PRESETS.quickFilter,
		}),
		blarp: new Wad({
			source : 'square',
			pitch: 'D3',
			env: SOUND_PRESETS.mediumEnv,
			filter: SOUND_PRESETS.midFilter,
		}),
		blink: new Wad({
			source : 'sawtooth',
			pitch: 'D4',
			env: SOUND_PRESETS.mediumEnv,
			filter: SOUND_PRESETS.midFilter,
		}),
		woosh: new Wad({
			source : 'sine',
			pitch: 'B1',
			env: {
				attack: 0.3,
				decay: 0.3,
				sustain: 0.5,
				hold: 0.1,
				release: 0.1
			},
			tremolo : {
				shape: 'sine',
				magnitude: 3,
				speed: 0.2,
				attack: 0
			},
		})
	};
}