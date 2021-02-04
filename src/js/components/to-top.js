export default function({element}) {
	element.addEventListener('click', () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
}
