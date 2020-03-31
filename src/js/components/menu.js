export default function() {
	const toggleMenuBtn = document.querySelector('.js-index-toggle-menu');
	if (!toggleMenuBtn) return;

	const menu = document.querySelector('.js-index-menu');
	const bg = document.querySelector('.js-index-menu-close');

	// events
	toggleMenuBtn.addEventListener('click', (e) => {
		toggleMenuBtn.classList.toggle('state-menu-active');
		menu.classList.toggle('state-menu-active');
		bg.classList.toggle('state-menu-active');
	});
	bg.addEventListener('click', closeMenu);
	document.addEventListener('keyup', e => {
		if (e.code === 'Escape') {
			closeMenu();
		}
	});

	function closeMenu(e) {
		toggleMenuBtn.classList.remove('state-menu-active');
		menu.classList.remove('state-menu-active');
		bg.classList.remove('state-menu-active');
	}
}
