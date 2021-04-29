import stater from '../tools/stater.js'
import events from '../tools/events.js'
import { getHash, setHash } from '../tools/hashish.js'

const ZINDEX = 10
const ZS = []

export default function({ element, children }) {
  const state = {
    id: element.dataset.boxId || '',
    shortcut: element.dataset.boxShortcut || false,
    active: stater(false),
  }

  state.active.onChange( active => {
    element.classList.toggle('state-box-active', active)
    element.style.display = active ? 'block' : 'none'

    ZS[active ? 'push' : 'pop']( element ) // naive z-index management
    element.style.zIndex = ZS.length + ZINDEX

    setHash( state.id, active )
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

    const { active, shortcut } = state

    if ( active.get() && e.key === 'Escape') close()
    if ( e.key === shortcut ) toggle()
  }

  events.subscribe(`TOGGLE_BOX_${state.id.toUpperCase()}`, toggle)
  events.subscribe(`SHOW_BOX_${state.id.toUpperCase()}`, open)
  events.subscribe(`CLOSE_BOX_${state.id.toUpperCase()}`, close)

  children['close'].addEventListener('click', close)
  children['bg'].addEventListener('click', close)

  // if hash present, open box by default (on load)
  if ( getHash( state.id ) ) open()

  // shortcut/hotkey to toggle the box
  if ( state.shortcut ) document.addEventListener('keyup', onKeyUp)

  state.active.update()

  return function() {
    events.unsubscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
    events.unsubscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
    events.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  }
}
