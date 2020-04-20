import Components from 'core/Components';

const MOVE_AMOUNT = 64; // 4em?
const MOVE_MULTIPLIER = 10;
const SCROLL_NAVIGATE = {
	to: top => {
		window.scrollTo({ top, left: 0, behavior: 'smooth' });
	},
	down: top => {
		window.scrollBy({ top, left: 0, behavior: 'smooth' });
	},
	up: top => {
		window.scrollBy({ top: -top, left: 0, behavior: 'smooth' });
	}
};

const Vim = {
	BACK_TO_TOP: () => {
		SCROLL_NAVIGATE.to(0);
	},
	GO_TO_END: () => {
		SCROLL_NAVIGATE.to(document.documentElement.scrollHeight);
	},
	MOVE_DOWN: () => { SCROLL_NAVIGATE.down(MOVE_AMOUNT) },
	MOVE_UP: () => { SCROLL_NAVIGATE.up(MOVE_AMOUNT) },
	MOVE_DOWN_FAR: () => { SCROLL_NAVIGATE.down(MOVE_AMOUNT * MOVE_MULTIPLIER) },
	MOVE_UP_FAR: () => { SCROLL_NAVIGATE.up(MOVE_AMOUNT * MOVE_MULTIPLIER) },
	MOVE_LEFT: () => {
		// todo: maybe show a back button, animated, that suggests that another tap towards the left goes backward?
		window.history.back();
	},
	MOVE_RIGHT: () => {
		// todo: maybe focus the center line post and clicks the links
		const { activeElement } = document;
		const elementId = activeElement.dataset.js;

		if ( elementId === 'entry') {
			activeElement.click();
		}
	},
	NAVIGATE_TO_HOME: () => {
		Components.broadcast('NAVIGATE_TO', { href: '/blog' });
	},
}

export default Vim;
