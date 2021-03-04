import debounce from 'lodash.debounce'
import reefer, { onReef } from '../tools/reefer'

const TRANSLATE_MULTIPLIER = 3 // rem
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75

export default function({ messaging }) {
  const rainbows = document.body.querySelector('#rainbow')

  const state = {
    container: document.body.querySelector('[data-barba="inside"]'),
    animation: {
      translate: reefer(0),
      opacity: reefer(1),
      transition: reefer(0)
    },
    transitioning: false,
    frame: 0,
    direction: 'X',
  }

  onReef( function() {
    const { translate, opacity, transition } = state.animation

    state.container.style.transform = `translateY(${ translate.get() * TRANSLATE_MULTIPLIER }rem)`
    state.container.style.opacity = opacity.get()

    state.frame = state.frame < TOTAL_FRAMES
      ? state.frame + (FRAME_MULTIPLIER * transition.get() )
      : 0

    rainbows.style.transform = `translate${state.direction}(-${ state.frame }%)`
  })

  const setDirectionFromBreakpoint = () => {
    const { innerWidth } = window
    const direction = innerWidth <= 800 ? 'X' : 'Y'

    state.direction = direction
  }

  window.addEventListener('resize', debounce( setDirectionFromBreakpoint, 500 ) )
  setDirectionFromBreakpoint()

  messaging.subscribe('PAGE_LEAVE', page => {
    state.container = page.current.container.querySelector('[data-barba="inside"]')
    state.transitioning = true
    state.animation.translate.set( -2, { stiffness: 50, damping: 40 })
    state.animation.opacity.set( 0, { stiffness: 200, damping: 14 })
    state.animation.transition.set( 1, { stiffness: 200, damping: 14 })
  })
  messaging.subscribe('PAGE_CHANGED', page => {
    state.container = page.next.container.querySelector('[data-barba="inside"]')
    state.transitioning = false
    state.animation.translate.set( 0, { stiffness: 400, damping: 15 })
    state.animation.opacity.set( 1, { stiffness: 400, damping: 15 })
    state.animation.transition.set( 0, { stiffness: 175, damping: 25 })
  })
  messaging.subscribe('SET_LOADING', loading => {
    if ( loading ) {
      state.animation.transition.set( 1, { stiffness: 200, damping: 14 })
    } else {
      state.animation.transition.set( 0, { stiffness: 100, damping: 25 })
    }
  })
}
