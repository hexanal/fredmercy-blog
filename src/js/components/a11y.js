export default function() {
	const storage = window.localStorage;
	const useBigFont = (storage.getItem('a11y_use_big_font') > 0);

	if (useBigFont) {
		document.documentElement.classList.add('state-a11y-big-font');
	} else {
		document.documentElement.classList.remove('state-a11y-big-font');
	}

	function updateFontSize(useBig) {
		storage.setItem('a11y_use_big_font', useBig);
		document.documentElement.classList.toggle('state-a11y-big-font', (useBig > 0));
	}

	document.addEventListener('keyup', e => {
		const { type } = document.activeElement;
		if (type === 'textarea' || type === 'input') return;

		if (e.code === 'Equal') {
			updateFontSize(1);
		}
		if (e.code === 'Minus') {
			updateFontSize(0);
		}
	});
}
