export default function({element, messaging}) {
  const { event } = element.dataset

  element.addEventListener('click', e => {
    e.preventDefault()
    messaging.dispatch({ id: event })
  })
}
