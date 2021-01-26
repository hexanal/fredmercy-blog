import Mousetrap from 'mousetrap';

export default function({ control, messaging }) {
	const setTheme = val => {
		control['theme-select'].value = val;
	}

	const setThemeMessaging =	messaging.subscribe('SET_THEME_VALUE', setTheme);

	control['theme-select'].addEventListener('change', e => {
		messaging.dispatch({ id: 'SWITCH_THEME', payload: e.target.value });
	});
	control['help-big-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: true}) );
	control['help-normal-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: false}) );

	Mousetrap.bind('?', () => messaging.dispatch({ id: 'SHOW_BOX_HELP' }) );

	return function() {
		setThemeMessaging();
	}
}
