import Mousetrap from 'mousetrap';
import DOMHelpers from 'tools/DOMHelpers';

const FONT_FAMILY_LIST = {
	plex: '"IBM Plex Mono", Courier, monospace',
	arial: 'Arial, sans-serif',
	garamond: 'Garamond, Georgia, "Times New Roman", serif',
};

export default function({ element, control, messaging }) {
	const state = {
		active: false,
	};

	const toggleHelp = () => {
		state.active = !state.active;
		document.body.classList.toggle('state-help-active');

		if (state.active) {
			DOMHelpers.focusFirstItem(element);
		}
	}

	const closeHelp = () => {
		state.active = false;
		document.body.classList.remove('state-help-active');
	}

	messaging.subscribe('SHOW_HELP', toggleHelp);
	messaging.subscribe('CLOSE_HELP', closeHelp);
	messaging.subscribe('SET_THEME_VALUE', val => { control['theme-select'].value = val; });

	control['show-menu'].addEventListener('click', () => messaging.dispatch({ id: 'TOGGLE_MENU' }) );
	control['help-show'].addEventListener('click', toggleHelp);
	control['help-close'].addEventListener('click', closeHelp);
	control['help-bg'].addEventListener('click', closeHelp);
	control['help-big-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: true}) );
	control['help-normal-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: false}) );
	control['theme-edit'].addEventListener('click', () => {
		messaging.dispatch({ id: 'CLOSE_MENU' });
		messaging.dispatch({ id: 'CLOSE_HELP' });
		messaging.dispatch({ id: 'OPEN_THEME_EDITOR' });
	});
	control['theme-select'].addEventListener('change', e => {
		messaging.dispatch({ id: 'SWITCH_THEME', payload: e.target.value });
	});
	control['font-select'].addEventListener('change', e => {
		document.documentElement.style.setProperty('--font', FONT_FAMILY_LIST[e.target.value]);
	});

	Mousetrap(element).bind('escape', closeHelp);
	Mousetrap.bind('?', toggleHelp );
}
