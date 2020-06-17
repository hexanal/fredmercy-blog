import Mousetrap from 'mousetrap';
import ConfigManager from 'tools/ConfigManager';
import DOMHelpers from 'tools/DOMHelpers';

const FONT_FAMILY_LIST = {
	plex: '"IBM Plex Mono", Courier, monospace',
	arial: 'Arial, sans-serif',
	garamond: 'Garamond, Georgia, "Times New Roman", serif',
};

export default function({ element, control }) {
	const state = {
		active: false,
	};

	control['show-menu'].addEventListener('click', () => {
		messaging.dispatch({ id: 'TOGGLE_MENU' });
	});
	control['help-show'].addEventListener('click', toggleHelp);
	control['help-close'].addEventListener('click', closeHelp);
	control['help-bg'].addEventListener('click', closeHelp);
	control['help-big-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: true}) );
	control['help-normal-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: false}) );

	setupThemeFeature();
	setupFontSelectFeature();

	Mousetrap(element).bind('escape', closeHelp);
	Mousetrap.bind('s', () => messaging.dispatch({ id: 'TOGGLE_BLEEPS' }) );
	Mousetrap.bind('?', toggleHelp );

	messaging.subscribe('SHOW_HELP', toggleHelp);
	messaging.subscribe('CLOSE_HELP', closeHelp);

	const toggleHelp = () => {
		messaging.dispatch({ id: 'TOGGLE_BLEEPS' })

		state.active = !state.active;
		document.body.classList.toggle('state-help-active');

		if (state.active) {
			DOMHelpers.focusFirstItem(this.state.component);
		}
	}

	const closeHelp = () => {
		state.active = false;
		document.body.classList.remove('state-help-active');
	}

	const setupThemeFeature = function() {
		if ( !ConfigManager.featureEnabled('useThemes') ) return;

		control['theme-edit'].addEventListener('click', () => {
			messaging.dispatch({ id: 'CLOSE_MENU' })
			messaging.dispatch({ id: 'CLOSE_HELP' })
			messaging.dispatch({ id: 'OPEN_THEME_EDITOR' })
		});
	}

	const setupFontSelectFeature = function() {
		if ( !ConfigManager.featureEnabled('useFontSelect') ) return;

		control['font-select'].addEventListener('change', e => {
			document.documentElement.style.setProperty('--font', FONT_FAMILY_LIST[e.target.value]);
		});
	}
}
