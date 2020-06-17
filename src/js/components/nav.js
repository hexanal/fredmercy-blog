import Mousetrap from 'mousetrap';
import DOMHelpers from 'utils/DOMHelpers';

export default function({ui, control, messaging }) {
	const state = {
		open: false,
	};

	control['toggle-menu'].addEventListener('click', toggleMenu);
	control['menu-bg'].addEventListener('click', closeMenu);
	control['help-toggle'].addEventListener('click', () => messaging.dispatch({ id: 'SHOW_HELP' }) );
	control['to-top'].addEventListener('click', () => window.scrollTo(0, 0));

	Mousetrap.bind('m', toggleMenu);
	Mousetrap(ui['menu'])
		.bind('escape', closeMenu);

	messaging.subscribe('CLOSE_MENU', closeMenu);
	messaging.subscribe('TOGGLE_MENU', toggleMenu);

	const toggleMenu = () => {
		state.open = !this.state.open;

		control['toggle-menu'].classList.toggle('state-menu-active');
		ui['menu'].classList.toggle('state-menu-active');
		state.bg.classList.toggle('state-menu-active');

		DOMHelpers.focusFirstItem(ui['menu']);

		messaging.dispatch({ id: 'MENU_TOGGLED', payload: this.state.open });
	}

	const closeMenu = () => {
		state.open = false;
		ui['menu'].classList.remove('state-menu-active');
		ui['toggleBtn'].classList.remove('state-menu-active');
		ui['menu-bg'].classList.remove('state-menu-active');

		messaging.dispatch({ id: 'MENU_CLOSED' });
	}

}
