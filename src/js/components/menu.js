export default function() {
	const toggleMenuBtn = document.querySelector('.js-index-toggle-menu');
	if (!toggleMenuBtn) return;

	const menu = document.querySelector('.js-index-menu');
	const bg = document.querySelector('.js-index-menu-close');
	const help = document.querySelector('.js-help');
	const helpCloseBtn = document.querySelector('.js-help-close');

	function toggleHelp(e) {
		e.preventDefault();
		document.body.classList.toggle('state-help-active');
	}
	function toggleMenu(e) {
		e.preventDefault();

		toggleMenuBtn.focus();

		toggleMenuBtn.classList.toggle('state-menu-active');
		menu.classList.toggle('state-menu-active');
		bg.classList.toggle('state-menu-active');
	}
	function closeMenu() {
		// todo: give back focus to element that had it before the menu was shown
		toggleMenuBtn.classList.remove('state-menu-active');
		menu.classList.remove('state-menu-active');
		bg.classList.remove('state-menu-active');
	}

	// events
	toggleMenuBtn.addEventListener('click', toggleMenu);
	help.addEventListener('click', toggleHelp);
	helpCloseBtn.addEventListener('click', toggleHelp);
	bg.addEventListener('click', closeMenu);

	document.addEventListener('keyup', e => {
		const { type } = document.activeElement;
		if (type === 'textarea' || type === 'input') return;

		if (e.code === 'KeyM') {
			toggleMenu(e);
		}
		if (e.code === 'Slash') {
			toggleHelp(e);
		}
		if (e.code === 'Escape') {
			closeMenu();
		}
	});
}
