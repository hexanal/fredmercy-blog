import imagesLoaded from 'imagesloaded';

export default function() {
	const feed = document.querySelector('.js-photofeed');

	if (!feed) return;

	/**
	 * Setup
	 */
	const photos = document.querySelectorAll('.js-photofeed-item');
	const photoLinks = document.querySelectorAll('.js-photofeed-photo');
	const closeButtons = document.querySelectorAll('.js-photofeed-close');

	let currentPhoto = null;

	photos.forEach(pic => {
		const img = pic.querySelector('img');
		const src = img.dataset.src;

		img.src = src;

		imagesLoaded(img, function(instance) {
			pic.classList.add('state-loaded');
		});
	});

	/**
	 * Events
	 */
	document.addEventListener('keyup', e => keyUpEvent(e));
	document.addEventListener('keydown', e => keyDownEvent(e));

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

	function keyDownEvent(e) {
		const {key} = e;

		if (key === 'ArrowLeft') {
			e.preventDefault();
			showSiblingImage(e, 'previous');
		}
		if (key === 'ArrowRight') {
			e.preventDefault();
			showSiblingImage(e, 'next');
		}
	}

	function keyUpEvent(e) {
		const {key} = e;

		if (key === 'Escape') closeDetails();
	}

	function showSiblingImage(e, direction) {
		if (!currentPhoto) return;

		closeButtons.forEach(btn => {
			btn.setAttribute('tabindex', '-1');
		});
		currentPhoto.classList.remove('state-show-details');

		currentPhoto = direction === 'next'
			? currentPhoto.nextElementSibling
			: currentPhoto.previousElementSibling;

		if (!currentPhoto) return;

		currentPhoto.scrollLeft = 0; // reset the left scroll bro
		document.body.scrollLeft = 0; // reset the left scroll bro

		currentPhoto.classList.add('state-show-details');

		const closeBtn = currentPhoto.querySelector('.js-photofeed-close');
		closeBtn.removeAttribute('tabindex');
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
