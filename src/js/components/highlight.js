export default function() {
	const hash = window.location.hash;
	const pageTimestamps = document.querySelectorAll('.post code');

	if (!pageTimestamps) return;

	pageTimestamps.forEach(code => {
		if (`#@${code.innerHTML}` === `${hash}:`) {
			code.parentElement.classList.add('state-paragraph-focused');
		}
	})
}
