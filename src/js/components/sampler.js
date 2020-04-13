import Utils from '../core/Utils';

const HOWLER_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.3/howler.min.js';

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
		if ( !Utils.config.featureEnabled('useHowler') ) return;

		this.state.enabled = (this.state.storage.getItem('sounds_enabled') > 0);
		if (this.state.enabled) this.enableSounds();

		this.state.enableSoundsBtn = component.querySelector('[data-js="enable-sounds"]');
		this.state.soundLabel = component.querySelector('[data-js="sound-status"]');

		this.state.enableSoundsBtn.addEventListener('click', () => {
			if (!this.state.loaded || !Howler) {
				return this.init();
			}

			this.toggleSounds();
		});
	}

	this.toggleSounds = function() {
		this.state.enabled = !this.state.enabled;
		if (this.state.enabled) {
			this.enable();
		} else {
			this.disable();
		}
	}

	this.enable = (e) => {
		if (!this.state.loaded || !Howler) return this.init();

		this.state.enableSoundsBtn.classList.add('state-sounds-enabled');
		this.state.soundLabel.innerHTML = 'on';
		Howler.mute(false);
	}

	this.disable = () => {
		if (!Howler) return;

		this.state.enableSoundsBtn.classList.remove('state-sounds-enabled');
		this.state.soundLabel.innerHTML = 'off';
		Howler.mute(true);
	}

	this.init = function() {
		this.state.loading = true;

		Utils.dom.loadJS(HOWLER_CDN_URL)
			.then(() => {
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
			boop: new Howl({src: ['/files/sounds/ui/boop.mp3']})
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
