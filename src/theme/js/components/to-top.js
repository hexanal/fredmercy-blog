export default function({element, events}) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  element.addEventListener('click', () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  }))

  events.subscribe('SCROLLED', ({scrolled}) => {
    if ( scrolled ) {
      return element.removeAttribute('tabindex')
    }

    return element.setAttribute('tabindex', '-1')
  })
}
