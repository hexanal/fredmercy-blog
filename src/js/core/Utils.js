const Utils = {
	math: {
		clamp(min, max, value) {
			return Math.min(max, Math.max(min, value));
		},

		getProbabilityOutcome(probability) {
			return probability > Math.random();
		},

		getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		},

		round(val, scale = 5) {
			const decimals = Math.pow(10, scale);
			return Math.round((val + Number.EPSILON) * decimals) / decimals;
		},
	},

	time: {
		debounce ( callback, wait = 250 ) {
			let timer;
			let last_call = 0;
			return (...args) => {
				clearTimeout(timer);
				const now = Date.now(), time_from_last_call = now - last_call;

				if (time_from_last_call > wait) {
					last_call = now;
					callback(...args);
				}
				else {
					timer = setTimeout(() => {
						last_call = now;
						callback(...args);
					}, wait);
				}
			};
		},

		throttle ( callback, limit ) {
			let wait = false;
			return function () {
				if (!wait) {
					callback.call();
					wait = true;
					setTimeout(function () {
						wait = false;
					}, limit);
				}
			}
		}
	},

	dom: {
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
	}

};

export default Utils;
