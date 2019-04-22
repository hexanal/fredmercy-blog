export default function() {
	const notes = document.querySelectorAll('sup');
	if (!notes) return;

	// @todo write code to close all when escape is pressed?
	// @todo close on click outside?

	notes.forEach((note) => {
		const title = note.getAttribute('title');
		const more = note.dataset.more || '';

		if (!title) return;

		const tip = document.createElement('div');

		tip.classList.add('note');
		tip.innerText = title + ' ' + more;

		note.appendChild(tip);

		note.addEventListener('click', (e) => {
			e.preventDefault();
			tip.classList.add('state-note-visible');
		});

		tip.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			tip.classList.remove('state-note-visible');
		});
	});
}