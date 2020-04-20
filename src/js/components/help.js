import Mousetrap from 'mousetrap';
import Components from 'core/Components';
import Config from 'utils/Config';
import DOMHelpers from 'utils/DOMHelpers';

const FONT_FAMILY_LIST = {
	plex: '"IBM Plex Mono", Courier, monospace',
	arial: 'Arial, sans-serif',
	garamond: 'Garamond, Georgia, "Times New Roman", serif',
};

export default function() {
	this.global = true;
	this.state = {
		active: false,
		component: null,
		toggleBtn: null,
		closeBtn: null,
		bg: null,
		fontIncreaseBtn: null,
		fontDecreaseBtn: null,
		themeEditBtn: null,
	};

	this.onMount = function(component, id) {
		this.state.component = component;
		this.state.closeBtn = DOMHelpers.getChild('help-close', component);
		this.state.bg = DOMHelpers.getChild('help-bg', component);
		this.state.fontIncreaseBtn = DOMHelpers.getChild('help-big-font', component);
		this.state.fontDecreaseBtn = DOMHelpers.getChild('help-normal-font', component);
		this.state.menuBtn = DOMHelpers.getChild('show-menu', component);
		this.state.helpBtn = DOMHelpers.getChild('help-show', component);

		this.state.menuBtn.addEventListener('click', () => {
			Components.broadcast('TOGGLE_MENU');
		});
		this.state.helpBtn.addEventListener('click', this.toggleHelp);
		this.state.closeBtn.addEventListener('click', this.closeHelp);
		this.state.bg.addEventListener('click', this.closeHelp);
		this.state.fontIncreaseBtn.addEventListener('click', () => Components.broadcast('A11Y_SET_LARGE_FONT', true));
		this.state.fontDecreaseBtn.addEventListener('click', () => Components.broadcast('A11Y_SET_LARGE_FONT', false));

		this.setupThemeFeature();
		this.setupFontSelectFeature();

		Mousetrap.bind('s', () => Components.broadcast('TOGGLE_BLEEPS') );
		Mousetrap.bind('?', this.toggleHelp );

		Mousetrap(this.state.component)
			.bind('escape', this.closeHelp);
	}

	this.listen = function(id) {
		if (id === 'SHOW_HELP') {
			this.toggleHelp();
		}
		if (id === 'CLOSE_HELP') {
			this.closeHelp();
		}
	}

	this.toggleHelp = () => {
		Components.broadcast('TOGGLE_HELP');

		this.state.active = !this.state.active;
		document.body.classList.toggle('state-help-active');

		if (this.state.active) {
			DOMHelpers.focusFirstItem(this.state.component);
		}
	}
	this.closeHelp = () => {
		this.state.active = false;
		document.body.classList.remove('state-help-active');
	}

	this.setupThemeFeature = function() {
		if ( !Config.featureEnabled('useThemes') ) return;

		this.state.themeEditBtn = DOMHelpers.getChild('theme-edit', this.state.component);
		this.state.themeEditBtn.addEventListener('click', () => {
			Components.broadcast('CLOSE_MENU');
			Components.broadcast('CLOSE_HELP');
			Components.broadcast('OPEN_THEME_EDITOR');
		});
	}

	this.setupFontSelectFeature = function() {
		if ( !Config.featureEnabled('useFontSelect') ) return;

		this.state.fontSelect = DOMHelpers.getChild('font-select', this.state.component);
		this.state.fontSelect.addEventListener('change', e => {
			document.documentElement.style.setProperty('--font', FONT_FAMILY_LIST[e.target.value]);
		});
	}
}
