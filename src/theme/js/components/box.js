import stater from '../tools/stater'
import { getHash, setHash } from '../tools/hashish'

const ZINDEX = 10
const ZS = []

export default function({ element, ui, control, events }) {
  const state = stater({
    id: element.dataset.boxId || '',
    shortcut: element.dataset.boxShortcut || false,
    active: false,
  })

  state.active.changed( active => {
    element.classList.toggle('state-box-active', active)
    element.style.display = active ? 'block' : 'none'

    ZS[active ? 'push' : 'pop']( element ) // naive z-index management
    element.style.zIndex = ZS.length + ZINDEX

    setHash( state.get().id, active )
  })

  const toggle = () => {
    const { active } = state.get()
    state.active.set(!active)
  }
  const open = () => state.active.set(true)
  const close = () => state.active.set(false)

  const onKeyUp = e => {
    const focused = document.activeElement.tagName
    if ( focused === 'TEXTAREA' || focused === 'INPUT' ) return

    const { active, shortcut } = state.get()

    if ( active && e.key === 'Escape') close()
    if ( e.key === shortcut ) toggle()
  }

  events.subscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
  events.subscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
  events.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

  control['close'].addEventListener('click', close)
  control['bg'].addEventListener('click', close)

  if ( getHash( state.get().id ) ) open()

  if ( state.get().shortcut ) {
    document.addEventListener('keyup', onKeyUp)
  }

  state.update()

  return function() {
    events.unsubscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
    events.unsubscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
    events.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  }
}
