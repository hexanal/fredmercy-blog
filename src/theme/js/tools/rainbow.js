import debounce from '../tools/debounce.js'
import events from '../tools/events.js'
import reefer, { onReef, SPRING_SNAP, SPRING_SOFT } from '../tools/reefer.js'

const TRANSLATE_MULTIPLIER = 0.5 // rem
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 1

export default function() {
  const rainbows = document.getElementById('🌈')

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

  // events.subscribe('SAME_PAGE', () => {
  //   state.animation.transition.set( 1, SPRING_TIGHT)
  //   state.animation.translate.set( -1, SPRING_TIGHT)
  //   setTimeout( () => {
  //     state.animation.transition.set( 0, SPRING_TIGHT)
  //     state.animation.translate.set( 0, SPRING_TIGHT)
  //   }, 200)
  // })
  events.subscribe('PAGE_LEAVE', page => {
    state.container = page.current.container.querySelector('[data-barba="inside"]')
    state.transitioning = true
    state.animation.translate.set( 1, SPRING_SOFT)
    state.animation.opacity.set( 0, SPRING_SOFT)
    state.animation.transition.set( 1, SPRING_SNAP)
  })
  events.subscribe('PAGE_CHANGED', page => {
    state.container = page.next.container.querySelector('[data-barba="inside"]')
    state.transitioning = false
    state.animation.translate.set( 0, SPRING_SNAP)
    state.animation.opacity.set( 1, SPRING_SNAP)
    state.animation.transition.set( 0, { stiffness: 80, damping: 12 })
  })
  // messaging.subscribe('SET_LOADING', loading => {
  //   if ( loading ) {
  //     state.animation.transition.set( 1, { stiffness: 200, damping: 14 })
  //   } else {
  //     state.animation.transition.set( 0, { stiffness: 100, damping: 25 })
  //   }
  // })
}
