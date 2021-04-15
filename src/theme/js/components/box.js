import Mousetrap from 'mousetrap'
import stater from '../tools/stater'
import reefer, { onReef } from '../tools/reefer'
import { getHash, setHash } from '../tools/hashish'

const ROTATE_MULTIPLIER = -1.5
const SHADOW_DISTANCE = 0.8 // in rem
const BG_OPACITY = 0.9
const ZINDEX = 10
const ZS = []

export default function({ element, ui, control, events }) {
  const state = stater({
    id: element.dataset.boxId || '',
    shortcut: element.dataset.boxShortcut || false,
    active: false,
  })
  const animation = {
    y: reefer(2),
    opacity: reefer(0),
    shadow: reefer(0)
  }

  onReef( function() {
    const opacity = animation.opacity.get()
    const y = animation.y.get()
    const shadow = animation.shadow.get() * SHADOW_DISTANCE

    element.style.display = opacity > 0.001 ? 'block' : 'none'
    element.style.pointerEvents = opacity > 0.75 ? 'auto' : 'none'
    ui['frame'].style.opacity = opacity
    ui['bg'].style.opacity = opacity * BG_OPACITY

    ui['wrap'].style.transform = `translateY(${y * 1.5}rem) rotate(${ (1 - animation.shadow.get() ) * ROTATE_MULTIPLIER }deg)`
    ui['wrap'].style.boxShadow = `${ shadow }rem ${ shadow }rem 0 0 var(--color-primary)`

    if (ui['title']) { ui['title'].style.transform = `translateY(${y * 0.5}rem)` }
    control['close'].style.transform = `translateY(${y * 0.5}rem)`
  })

  state.active.changed( active => {
    element.classList.toggle('state-box-active', active)

    Mousetrap[active ? 'bind' : 'unbind']('escape', close)

    ZS[active ? 'push' : 'pop']( element )
    element.style.zIndex = ZS.length + ZINDEX

    const y = active ? 0 : 1
    const opacity = active ? 1 : 0
    const shadow = active ? 1 : 0
    const stiffness = active ? 600 : 200

    animation.y.set( y, { stiffness, damping: 16 })
    animation.shadow.set( shadow, { stiffness, damping: 13 })
    animation.opacity.set( opacity, { stiffness: 400, damping: 20 })

    setHash( state.get().id, active )
  })

  const toggle = () => {
    const { active } = state.get()
    state.active.set(!active)
  }
  const open = () => state.active.set(true)
  const close = () => state.active.set(false)

  events.subscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
  events.subscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
  events.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

  control['close'].addEventListener('click', close)
  control['bg'].addEventListener('click', close)

  if ( getHash( state.get().id ) ) open()

  if ( state.get().shortcut ) Mousetrap.bind( state.get().shortcut, toggle )

  state.update()

  return function() {
    events.unsubscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
    events.unsubscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
    events.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  }
}
