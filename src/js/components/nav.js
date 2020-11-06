import Mousetrap from 'mousetrap';
import DOMHelpers from 'tools/DOMHelpers';

export default function({ui, control, messaging }) {
	const state = {
		open: false,
	};

	const toggleMenu = () => {
		state.open = !state.open;

		control['toggle-menu'].classList.toggle('state-menu-active');
		ui['menu'].classList.toggle('state-menu-active');
		control['menu-bg'].classList.toggle('state-menu-active');

		// DOMHelpers.focusFirstItem(ui['menu']);

		messaging.dispatch({ id: 'MENU_TOGGLED', payload: state.open });
	}

	const closeMenu = () => {
		state.open = false;
		ui['menu'].classList.remove('state-menu-active');
		control['toggle-menu'].classList.remove('state-menu-active');
		control['menu-bg'].classList.remove('state-menu-active');

		messaging.dispatch({ id: 'MENU_CLOSED' });
	}

	control['toggle-menu'].addEventListener('click', toggleMenu);
	control['menu-bg'].addEventListener('click', closeMenu);
	control['help-toggle'].addEventListener('click', () => messaging.dispatch({ id: 'SHOW_HELP', payload: true }) );
	control['to-top'].addEventListener('click', () => window.scrollTo(0, 0));

	messaging.subscribe('CLOSE_MENU', closeMenu);
	messaging.subscribe('TOGGLE_MENU', toggleMenu);

	Mousetrap.bind('m', toggleMenu);
	Mousetrap(ui['menu']).bind('escape', closeMenu);

	return function() {
		messaging.unsubscribe('CLOSE_MENU', closeMenu);
		messaging.unsubscribe('TOGGLE_MENU', toggleMenu);
	}
}
