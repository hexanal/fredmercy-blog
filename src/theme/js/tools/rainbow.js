import debounce from '../tools/debounce.js'
import events from '../tools/events.js'
import reefer, { onReef, SPRING_TIGHT, SPRING_SOFT } from '../tools/reefer.js'

const TOTAL_FRAMES = 100
const OFFSET = 6 // px
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
  }

  onReef( function() {
    const { translate, transition, opacity } = state.animation

    const translateX = state.transitioning
      ? translate.get() * -OFFSET
      : translate.get() * OFFSET
    state.container.style.transform = `translateX(${translateX}rem)`
    state.container.style.opacity = opacity.get()

    state.frame = state.frame < TOTAL_FRAMES
      ? state.frame + (FRAME_MULTIPLIER * transition.get() )
      : 0

    rainbows.style.transform = `translateX(-${ state.frame }%)`
  })

  events.subscribe('PAGE_LEAVE', page => {
    state.container = page.current.container.querySelector('[data-barba="inside"]')
    state.transitioning = true
    state.animation.translate.set( 1, SPRING_SOFT)
    state.animation.opacity.set( 0, SPRING_SOFT)
    state.animation.transition.set( 1, SPRING_TIGHT)
  })

  events.subscribe('PAGE_CHANGED', page => {
    state.container = page.next.container.querySelector('[data-barba="inside"]')
    state.transitioning = false
    state.animation.translate.set( 0, SPRING_TIGHT)
    state.animation.opacity.set( 1, SPRING_TIGHT)
    state.animation.transition.set( 0, { stiffness: 80, damping: 12 })
  })
}
