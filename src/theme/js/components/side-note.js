export default function({ element }) {
  const state = {
    visible: false
  }

  element.addEventListener('click', (e) => {
    e.stopPropagation()

    toggle()
  })

  const toggle = function() {
    state.visible = !state.visible
    element.classList.toggle('state-note-visible', state.visible)
  }
}
