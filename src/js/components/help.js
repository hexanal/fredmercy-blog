import Components from '../core/Components';
import Utils from '../core/Utils';
const { getChild } = Utils.dom;

const FONT_FAMILY_LIST = {
	plex: '"IBM Plex Mono", Courier, monospace',
	arial: 'Arial, sans-serif',
	garamond: 'Garamond, Georgia, "Times New Roman", serif',
};

export default function() {
	this.global = true;
	this.state = {
		component: null,
		toggleBtn: null,
		closeBtn: null,
		bg: null,
		storage: null,
		fontIncreaseBtn: null,
		fontDecreaseBtn: null,
		themeEditBtn: null,
	};

	this.onMount = function(component, id) {
		this.state.storage = window.localStorage;
		this.state.component = component;
		this.state.closeBtn = getChild('help-close', component);
		this.state.bg = getChild('help-bg', component);
		this.state.fontIncreaseBtn = getChild('help-big-font', component);
		this.state.fontDecreaseBtn = getChild('help-normal-font', component);
		this.state.menuBtn = getChild('show-menu', component);
		this.state.helpBtn = getChild('help-show', component);

		this.state.menuBtn.addEventListener('click', () => {
			Components.broadcast('TOGGLE_MENU');
		});
		this.state.helpBtn.addEventListener('click', this.toggleHelp);
		this.state.closeBtn.addEventListener('click', this.closeHelp);
		this.state.bg.addEventListener('click', this.closeHelp);
		this.state.fontIncreaseBtn.addEventListener('click', () => this.updateFontSize(1));
		this.state.fontDecreaseBtn.addEventListener('click', () => this.updateFontSize(0));

		this.setupThemeFeature();
		this.setupFontSelectFeature();

		document.addEventListener('keyup', e => {
			if (Utils.dom.shouldDisableShortcuts()) return;

			if (e.code === 'KeyS') {
				Components.broadcast('TOGGLE_BLEEPS');
			}
			if (e.code === 'Slash') {
				this.toggleHelp(e);
			}
			if (e.code === 'Escape') {
				this.closeHelp();
			}
		});
	}

	this.listen = function(id) {
		if (id === 'SHOW_HELP') {
			this.toggleHelp();
		}
		if (id === 'CLOSE_HELP') {
			this.closeHelp();
		}
	}

	this.toggleHelp = function() {
		document.body.classList.toggle('state-help-active');
	}
	this.closeHelp = function() {
		document.body.classList.remove('state-help-active');
	}

	this.updateFontSize = function(useBig) {
		this.state.storage.setItem('a11y_use_big_font', useBig);
		document.documentElement.classList.toggle('state-a11y-big-font', (useBig > 0));
	}

	this.setupThemeFeature = function() {
		if ( !Utils.config.featureEnabled('useThemes') ) return;

		this.state.themeEditBtn = getChild('theme-edit', this.state.component);
		this.state.themeEditBtn.addEventListener('click', () => {
			Components.broadcast('CLOSE_MENU');
			Components.broadcast('CLOSE_HELP');
			Components.broadcast('OPEN_THEME_EDITOR');
		});
	}

	this.setupFontSelectFeature = function() {
		if ( !Utils.config.featureEnabled('useFontSelect') ) return;

		this.state.fontSelect = getChild('font-select', this.state.component);
		this.state.fontSelect.addEventListener('change', e => {
			document.documentElement.style.setProperty('--font', FONT_FAMILY_LIST[e.target.value]);
		});
	}
}
