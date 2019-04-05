export default function() {
	const jumpto = document.querySelector('.js-index-jumpto');
	if (!jumpto) return;

	// init
	const currentHash = location.hash;
	jumpto.value = decodeURIComponent((currentHash+'').replace(/\+/g, '%20'));

	// event
	jumpto.addEventListener('change', (e) => {
		if (e.target.value === '') history.pushState('', document.title, window.location.pathname);
		location.hash = e.target.value;
	});
}