// import Mousetrap from 'mousetrap';
// import Vim from 'tools/Vim';

/**
 * todo: find a way to have different layouts for different "MODES"
 * - in modal: no moving around, no funny business
 * - in form: other bindings
 * - in menu: other useful bindings
 */

export default function() {
	const state = {
		enabled: false
	};

	/*
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

	document.addEventListener('keydown', setInput('keyboard'));
	document.addEventListener('click', setInput('pointer'));
	document.addEventListener('mousemove', setInput('pointer'));

	const setInput = function(type) {
		return e => {
			document.documentElement.dataset.inputDevice = type;
			state.enabled = type === 'keyboard';
		};
	};

	// const activate = function() {
	// 	document.activeElement.click();
	// };

	*/
}
