export default function() {
	this.lines = {};
	this.component = null;

	// todo: if we want to do stuff based on other set props :)
	// this.listen = (id, payload) => {
	// 	if (id === 'DEBUG_SET_PROP') {
	// 	}
	// }

	this.onMount = function(component) {
		this.component = component;
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
	}
}
