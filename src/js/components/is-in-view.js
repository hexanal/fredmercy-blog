export function isInView(el, threshold = {top: 0, bottom: 0}) {
	if (!el) return false;
	const {top, bottom} = el.getBoundingClientRect();
	if (top === bottom) {
		return false; // if top === bottom, the element has no height: get outta here!
	}

	// check if we want a percentage
	const topThreshold = typeof(threshold.top) === 'string' && threshold.top.includes('%')
		? distanceFromTopOfViewport(threshold.top)
		: threshold.top;
	const bottomThreshold = typeof(threshold.bottom) === 'string' && threshold.bottom.includes('%')
		? distanceFromTopOfViewport(threshold.bottom)
		: threshold.bottom;

	return top <= topThreshold && bottom >= bottomThreshold;
}

function distanceFromTopOfViewport(percentage) {
	const ratio = percentage.substring(0, percentage.length - 1) / 100;
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;

	return windowHeight * ratio;
}
