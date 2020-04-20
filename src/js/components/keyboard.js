import Mousetrap from 'mousetrap';
import Vim from '../utils/Vim';

export default function() {
	this.global = true;
	this.state = {
		focusZone: '',
		focused: 0,
		enabled: false
	};

	this.onMount = function() {
		Mousetrap.bind('g g', Vim.BACK_TO_TOP );
		Mousetrap.bind('shift+g', Vim.GO_TO_END );
		Mousetrap.bind('j', Vim.MOVE_DOWN );
		Mousetrap.bind('k', Vim.MOVE_UP );
		Mousetrap.bind('mod+j', Vim.MOVE_DOWN_FAR );
		Mousetrap.bind('mod+k', Vim.MOVE_UP_FAR );
		Mousetrap.bind('backspace backspace', Vim.MOVE_LEFT);
		Mousetrap.bind('l', Vim.MOVE_RIGHT );

		Mousetrap.bind('shift+h', Vim.NAVIGATE_TO_HOME );
		// Mousetrap.bind('/', Vim.SEARCH );
		// Mousetrap.bind('w', Vim.NEXT_WORD );
		// Mousetrap.bind('b', Vim.PREVIOUS_WORD );

		document.addEventListener('keydown', this.setInput('keyboard'));
		document.addEventListener('click', this.setInput('pointer'));
		document.addEventListener('mousemove', this.setInput('pointer'));
	}

	this.setInput = function(type) {
		return e => {
			document.documentElement.dataset.inputDevice = type;
			this.state.enabled = type === 'keyboard';
		};
	},

	this.activate = function() {
		document.activeElement.click();
	}
}
