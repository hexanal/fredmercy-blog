export default function({ element }) {
	const hash = window.location.hash;
	const pageTimestamps = element.querySelectorAll('.post code');

	if (!pageTimestamps) return;

	pageTimestamps.forEach(code => {
		if (`#@${code.innerHTML}` === `${hash}:`) {
			code.parentElement.classList.add('state-paragraph-focused');
		}
	});
}
