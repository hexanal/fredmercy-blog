import Components from '../core/Components';
import Utils from '../core/Utils';
const { getChild } = Utils.dom;

export default function() {
	this.global = true;
	this.state = {
		menu: null,
		toggleBtn: null,
		firstMenuItem: null,
		bg: null,
		helpToggle: null,
		toTopBtn: null,
	};

	this.onMount = function(component, id) {
		this.state.menu = getChild('menu', component);
		this.state.toggleBtn = getChild('toggle-menu', component);
		this.state.firstMenuItem = getChild('menu-first', component);
		this.state.bg = getChild('menu-bg', component);
		this.state.helpToggle = getChild('help-toggle', component);
		this.state.toTopBtn = getChild('to-top', component);

		// events
		this.state.toggleBtn.addEventListener('click', this.toggleMenu);
		this.state.bg.addEventListener('click', this.closeMenu);
		this.state.helpToggle.addEventListener('click', () => Components.broadcast('SHOW_HELP') );
		this.state.toTopBtn.addEventListener('click', () => window.scrollTo(0, 0));

		// todo: think about a component that might handle all of the shortcuts
		document.addEventListener('keyup', e => {
			const { type } = document.activeElement;
			if (type === 'textarea' || type === 'input') return;

			if (e.code === 'KeyM') {
				this.toggleMenu();
			}
			if (e.code === 'Escape') {
				this.closeMenu();
			}
		});
	}

	this.listen = function(id) {
		if (id === 'CLOSE_MENU') {
			this.closeMenu();
		}
		if (id === 'TOGGLE_MENU') {
			this.toggleMenu();
		}
	}

	this.toggleMenu = e => {
		this.state.firstMenuItem.focus();

		this.state.toggleBtn.classList.toggle('state-menu-active');
		this.state.menu.classList.toggle('state-menu-active');
		this.state.bg.classList.toggle('state-menu-active');
	}

	this.closeMenu = e => {
		// todo: give back focus to element that had it before the menu was shown
		this.state.menu.classList.remove('state-menu-active');
		this.state.toggleBtn.classList.remove('state-menu-active');
		this.state.bg.classList.remove('state-menu-active');
	}

}
