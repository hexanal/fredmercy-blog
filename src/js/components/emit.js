export default function({element, messaging}) {
  const { event } = element.dataset

  element.addEventListener('click', () => messaging.dispatch({ id: event }) )
}
