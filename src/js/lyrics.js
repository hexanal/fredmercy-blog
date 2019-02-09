export default function() {
	const lyrics = document.querySelectorAll('.lyrics');

	if (!lyrics) return;

	/**
	 * Setup
	 */
	lyrics.forEach((lyricsContainer) => {
		lyricsContainer.querySelector('button').addEventListener('click', (e) => {
			e.preventDefault();
			lyricsContainer.classList.toggle('state-lyrics-shown');
		});
	});
}