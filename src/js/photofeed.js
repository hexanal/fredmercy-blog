import imagesLoaded from 'imagesloaded';
import { isInView } from './components/is-in-view';

function photofeed() {
	const feed = document.querySelector('.js-photofeed');
	const photos = document.querySelectorAll('.js-photofeed-item');

	if (!feed) return;

	photos.forEach(pic => {
		window.addEventListener('scroll', e => {
			if (isInView(pic, {top: '50%', bottom: '50%'})) {
				loadPicture(pic);
			};
		})
	});
}

function loadPicture(pic) {
	const img = pic.querySelector('img');
	const src = img.dataset.src;

	img.src = src;

	pic.classList.add('state-loading');

	imagesLoaded(img, () => {
		pic.classList.remove('state-loading');
		pic.classList.add('state-loaded');
	});
}

photofeed();
