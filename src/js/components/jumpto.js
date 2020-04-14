export default function() {
	this.global = true;
	this.state = {
		component: null,
	};

	this.onMount = function(component, id) {
		const currentHash = location.hash;

		this.state.component = component;
		this.state.component.value = decodeURIComponent((currentHash+'').replace(/\+/g, '%20'));
		focusFirstPostFromArchive(currentHash);

		this.state.component.addEventListener('change', (e) => {
			if (e.target.value === '') history.pushState('', document.title, window.location.pathname);
			location.hash = e.target.value;
			focusFirstPostFromArchive(e.target.value);
		});
	}
}

function focusFirstPostFromArchive(hash) {
	if (hash === '') return;

	const anchor = hash
		.replace('%20', ' ')
		.replace('#', '');
	const targetEl = document.querySelector(`[data-anchor="${anchor}"]`);

	if (!targetEl) return;

	const archivePosts = targetEl
		.parentElement
		.nextSibling
		.nextSibling; // todo: watch out for this one, it looks brittle
	const postLink = archivePosts.querySelector('[data-js="entry"]');

	postLink.focus({ preventScroll: true });
}