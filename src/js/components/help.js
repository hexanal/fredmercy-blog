export default function() {
	const help = document.querySelector('.js-help');
	if (!help) return;

	const toggle = document.querySelector('.js-help-toggle');
	const closeBtn = help.querySelector('.js-help-close');
	const bg = help.querySelector('.js-help-bg');
	// Accessibility buttons
	const storage = window.localStorage;
	const fontIncreaseBtn = document.querySelector('.js-help-big-font');
	const fontDecreaseBtn = document.querySelector('.js-help-normal-font');
	// const menuBtn = document.querySelector('.js-help-menu');

	function toggleHelp(e) {
		e.preventDefault();
		document.body.classList.toggle('state-help-active');
	}
	function closeHelp(e) {
		e.preventDefault();
		document.body.classList.remove('state-help-active');
	}

	// events
	toggle.addEventListener('click', toggleHelp);
	closeBtn.addEventListener('click', closeHelp);
	bg.addEventListener('click', closeHelp);

	fontIncreaseBtn.addEventListener('click', () => updateFontSize(1));
	fontDecreaseBtn.addEventListener('click', () => updateFontSize(0));

	function updateFontSize(useBig) {
		storage.setItem('a11y_use_big_font', useBig);
		document.documentElement.classList.toggle('state-a11y-big-font', (useBig > 0));
	}

	document.addEventListener('keyup', e => {
		const { type } = document.activeElement;
		if (type === 'textarea' || type === 'input') return;

		if (e.code === 'Slash') {
			toggleHelp(e);
		}
		if (e.code === 'Escape') {
			closeHelp();
		}
	});
}
