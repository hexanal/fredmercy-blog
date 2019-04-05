export default function() {
	const collapse = document.querySelectorAll('.collapse');
	if (!collapse) return;

	collapse.forEach((collapseContainer) => {
		collapseContainer.querySelector('button').addEventListener('click', (e) => {
			e.preventDefault();
			collapseContainer.classList.toggle('state-collapse-expand');
		});
	});
}