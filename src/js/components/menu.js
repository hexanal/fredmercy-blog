export default function() {
	const toggleMenuBtn = document.querySelector('.js-index-toggle-menu');
	if (!toggleMenuBtn) return;

	const menu = document.querySelector('.js-index-menu');
	const firstItem = menu.querySelector('.js-menu-first');
	const bg = document.querySelector('.js-index-menu-close');

	function toggleMenu(e) {
		e.preventDefault();

		firstItem.focus();

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
	bg.addEventListener('click', closeMenu);

	document.addEventListener('keyup', e => {
		const { type } = document.activeElement;
		if (type === 'textarea' || type === 'input') return;

		if (e.code === 'KeyM') {
			toggleMenu(e);
		}
		if (e.code === 'Escape') {
			closeMenu();
		}
	});
}
