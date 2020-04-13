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

	this.onMount = function(component, id) {
		if ( !Utils.config.featureEnabled('useBleeps') ) return;

		this.state.enabled = (this.state.storage.getItem('sounds_enabled') > 0);
		if (this.state.enabled) this.enableSounds();

		this.state.enableSoundsBtn = component.querySelector('[data-js="enable-sounds"]');
		this.state.bleepStatus = component.querySelector('[data-js="bleeps-status"]');

		this.state.enableSoundsBtn.addEventListener('click', () => {
			if (!this.state.loaded || !Wad) {
				return this.init();
			}

			this.toggleSounds();
		});
	}

	this.toggleSounds = function() {
		this.state.enabled = !this.state.enabled;

		if (this.state.enabled) {
			if (!this.state.loaded) return this.init();
			this.enable();
		} else {
			this.disable();
		}
	}

	this.enable = (e) => {
		this.state.storage.setItem('sounds_enabled', 1);
		this.state.bleepStatus.classList.add('state-sounds-enabled');
		Wad.setVolume(DEFAULT_VOLUME);
	}

	this.disable = () => {
		this.state.storage.setItem('sounds_enabled', 0);
		this.state.bleepStatus.classList.remove('state-sounds-enabled');
		Wad.setVolume(0);
	}

	this.init = function() {
		this.state.loading = true;

		Utils.dom.loadJS(WAD_PATH)
			.then(() => {
				this.state.Wad = window.Wad; // Web Audio Daw library
				this.state.loading = false;
				this.state.loaded = true;
				this.state.enabled = true;

				this.loadSounds();
				this.hookEvents();
				this.enable();
			});
	}

	this.loadSounds = function() {
		this.state.sounds = {
			boop: new Wad({
				source : 'triangle',
				pitch: 'B3',
				env: {
					attack: 0,
					decay: 0.05,
					sustain: 0.2,
					hold: 0,
					release: 0
				},
				filter: {
					type: 'lowpass',
					frequency : 600,
					q: 1,
					env: {
						frequency: 800,
						attack: 0.07
					}
				},
			})
		};
	}

	this.hookEvents = function() {
		const { sounds } = this.state;
		const links = document.querySelectorAll('a');
		// const buttons = document.querySelectorAll('button');

		links.forEach(link => {
			link.addEventListener('mouseover', e => sounds['boop'].play() );
			// etc.
		});

	}
}
