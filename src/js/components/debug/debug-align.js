import Mousetrap from 'mousetrap';

export default function() {
	this.lines = {};
	this.toggles = {};
	this.component = null;
	this.state = {
		enabled: false,
	}

	this.listen = (id, payload) => {
		const isTabSwitch = (id === 'TABS_SWITCHED' && payload.origin.id === 'debug-tabs');
		const isAlignLineSet = (id === 'DEBUG_TOGGLE_WAS_SET'
			&& (payload.prop === 'displayVertical' || payload.prop === 'displayHorizontal')
		);

		if (isTabSwitch) {
			this.toggleAlign(payload.tabId === 'align');
			this.hideCursorOnActive();
		}

		if (isAlignLineSet) {
			this.hideCursorOnActive();
		}
	}

	this.onMount = function(component) {
		this.component = component;
		this.toggles = {
			vertical: component.querySelector('[data-prop="displayVertical"]'),
			horizontal: component.querySelector('[data-prop="displayHorizontal"]'),
		};
		this.lines = {
			vertical: component.querySelector('[data-js="line-vertical"]'),
			horizontal: component.querySelector('[data-js="line-horizontal"]'),
		};
		document.addEventListener('mousemove', this.handleMove);
	}

	this.handleMove = e => {
		const { clientX, clientY } = e;
		this.component.style.setProperty('--x', `translate3d(${clientX}px, 0, 0)`);
		this.component.style.setProperty('--y', `translate3d(0, ${clientY}px, 0)`);
		this.lines.vertical.dataset.position = clientX;
		this.lines.horizontal.dataset.position = clientY;
	}

	this.hideCursorOnActive = () => {
		const { vertical, horizontal } = this.toggles;
		const enabled = ( this.state.enabled && this.toggles );
		const areBothLinesActive = this.toggles && ( vertical.checked && horizontal.checked);
		const shouldHideCursor = ( enabled && areBothLinesActive );
		document.documentElement.toggleAttribute('data-hide-cursor', shouldHideCursor);
	}

	this.toggleAlign = enable => {
		this.state.enabled = enable;
	}
}
