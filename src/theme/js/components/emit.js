export default function({element, events}) {
  const { event } = element.dataset

  element.addEventListener('click', e => {
    e.preventDefault()
    events.dispatch( event )
  })
}
