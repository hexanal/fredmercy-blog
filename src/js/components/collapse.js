import Components from '../core/Components';

export default function() {
	this.onMount = function() {
		const collapse = document.querySelectorAll('.collapse');
		if (!collapse) return;

		collapse.forEach((collapseContainer) => {
			collapseContainer.querySelector('button').addEventListener('click', (e) => {
				e.preventDefault();
				collapseContainer.classList.toggle('state-collapse-expand');

				Components.broadcast('PLAY_SOUND', 'kree');
			});
		});
	}
}
