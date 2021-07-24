export default function({element}) {
  const hash = window.location.hash.substr(1)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  element.classList.toggle('state-highlighted', element.getAttribute('id') === hash )

  // const { top } = element.getBoundingClientRect()
  // window.scrollTo({
  //   top,
  //   left: 0,
  //   behavior: prefersReducedMotion ? 'auto' : 'smooth'
  // })
}
