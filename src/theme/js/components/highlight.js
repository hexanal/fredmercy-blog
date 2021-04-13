export default function({element}) {
  const hash = window.location.hash.substr(1)
  element.classList.toggle('state-highlighted', element.getAttribute('id') === hash )
}
