export default function() {
	const feed = document.querySelector('.js-photofeed');

	if (!feed) return;

	/**
	 * Setup
	 */
	const photoLinks = document.querySelectorAll('.js-photofeed-photo');
	const closeButtons = document.querySelectorAll('.js-photofeed-close');

	let currentPhoto = null;

	/**
	 * Events
	 */
	document.addEventListener('keyup', keyUpEvent);

	photoLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			if (currentPhoto) return closeDetails();

			currentPhoto = e.currentTarget.parentElement;
			const closeBtn = currentPhoto.querySelector('.js-photofeed-close');

			closeBtn.removeAttribute('tabindex');
			currentPhoto.classList.add('state-show-details');

		});
	});

	closeButtons.forEach((btn) => {
		btn.addEventListener('click', e => {
			e.preventDefault();
			closeDetails();
		})
	});

	function keyUpEvent(e) {
		const {key} = e;

		if (key === 'Escape') closeDetails();
	}

	function closeDetails() {
		if (!currentPhoto) return;

		closeButtons.forEach(btn => {
			btn.setAttribute('tabindex', '-1');
		});

		currentPhoto.classList.remove('state-show-details');
		currentPhoto = null;
	}
}
