const DOMHelpers = {
	loadJS(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			document.head.appendChild(script);

			script.addEventListener('load', () => {
				resolve();
			});
		});
	},

	shouldDisableShortcuts() {
		const { tagName } = document.activeElement;
		return (tagName === 'TEXTAREA' || tagName === 'INPUT');
	},

	getChild(id, component) {
		return component.querySelector(`[data-js="${id}"]`);
	},

	getChildren(id, component) {
		return component.querySelectorAll(`[data-js="${id}"]`);
	},

	focusFirstItem(component) {
		const items = component.querySelectorAll('a, input, button, textarea, select');

		items[0].focus();

		return items[0];
	},

	isInView(el, threshold) {
		if (!el) return false;

		const { top } = el.getBoundingClientRect();
		const topThreshold = this.distanceFromTopOfViewport(threshold);

		return top <= topThreshold;
	},

	distanceFromTopOfViewport(ratio) {
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		return windowHeight * ratio;
	}
};

export default DOMHelpers;
