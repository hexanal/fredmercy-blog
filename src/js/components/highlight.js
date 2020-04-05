export default function() {
	this.onMount = function(component) {
		const hash = window.location.hash;
		const pageTimestamps = component.querySelectorAll('.post code');

		if (!pageTimestamps) return;

		pageTimestamps.forEach(code => {
			if (`#@${code.innerHTML}` === `${hash}:`) {
				code.parentElement.classList.add('state-paragraph-focused');
			}
		});
	}
}
