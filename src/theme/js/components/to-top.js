export default function({element}) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  element.addEventListener('click', () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  }))
}
