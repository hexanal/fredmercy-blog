export default function({element, events}) {
  const { event, eventPayload } = element.dataset

  element.addEventListener('click', e => {
    e.preventDefault()
    events.dispatch( event, eventPayload )
  })
}
