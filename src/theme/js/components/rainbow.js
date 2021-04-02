import debounce from 'lodash.debounce'
import reefer, { onReef } from '../tools/reefer'

const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75

export default function({ messaging }) {
  const rainbows = document.getElementById('🌈')

  const state = {
    transition: reefer(0),
    transitioning: false,
    frame: 0,
    direction: 'X',
  }

  onReef( function() {
    state.frame = state.frame < TOTAL_FRAMES
      ? state.frame + (FRAME_MULTIPLIER * state.transition.get() )
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

  messaging.subscribe('SET_LOADING', loading => {
    if ( loading ) {
      state.transition.set( 1, { stiffness: 200, damping: 14 })
    } else {
      state.transition.set( 0, { stiffness: 100, damping: 25 })
    }
  })
}
