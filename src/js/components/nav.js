import Mousetrap from 'mousetrap';
import Components from 'core/Components';
import DOMHelpers from 'utils/DOMHelpers';

export default function() {
	this.global = true;
	this.state = {
		open: false,
		menu: null,
		toggleBtn: null,
		bg: null,
		helpToggle: null,
		toTopBtn: null,
	};

	this.onMount = function(component) {
		this.state.menu = DOMHelpers.getChild('menu', component);
		this.state.toggleBtn = DOMHelpers.getChild('toggle-menu', component);
		this.state.firstMenuItem = DOMHelpers.getChild('menu-first', component);
		this.state.bg = DOMHelpers.getChild('menu-bg', component);
		this.state.helpToggle = DOMHelpers.getChild('help-toggle', component);
		this.state.toTopBtn = DOMHelpers.getChild('to-top', component);

		// events
		this.state.toggleBtn.addEventListener('click', this.toggleMenu);
		this.state.bg.addEventListener('click', this.closeMenu);
		this.state.helpToggle.addEventListener('click', () => Components.broadcast('SHOW_HELP') );
		this.state.toTopBtn.addEventListener('click', () => window.scrollTo(0, 0));

		Mousetrap.bind('m', this.toggleMenu);
		Mousetrap(this.state.menu)
			.bind('escape', this.closeMenu);
	}

	this.listen = function(id) {
		if (id === 'CLOSE_MENU') {
			this.closeMenu();
		}
		if (id === 'TOGGLE_MENU') {
			this.toggleMenu();
		}
	}

	this.toggleMenu = () => {
		this.state.open = !this.state.open;

		this.state.toggleBtn.classList.toggle('state-menu-active');
		this.state.menu.classList.toggle('state-menu-active');
		this.state.bg.classList.toggle('state-menu-active');

		DOMHelpers.focusFirstItem(this.state.menu);

		Components.broadcast('MENU_TOGGLED', this.state.open);
	}

	this.closeMenu = () => {
		this.state.open = false;

		// todo: give back focus to element that had it before the menu was shown
		this.state.menu.classList.remove('state-menu-active');
		this.state.toggleBtn.classList.remove('state-menu-active');
		this.state.bg.classList.remove('state-menu-active');

		Components.broadcast('MENU_CLOSED');
	}

}
