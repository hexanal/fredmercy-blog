import reefer, { onReef } from '../tools/reefer'

const ACTIVE_Z_INDEX = 3
const MIN_SCALE = 0
const SINE_FREQUENCY = 0.01
const SINE_AMPLITUDE = 0.02

export default function({ messaging }) {
  const element = document.querySelector('#ball')
  const scale = reefer( MIN_SCALE )

  onReef( function(timestamp) {
    const wobble = scale.get() + ( Math.sin(timestamp * SINE_FREQUENCY) * (scale.get() * SINE_AMPLITUDE) )
    element.style.zIndex = scale.get() >= MIN_SCALE ? ACTIVE_Z_INDEX : -1
    element.style.transform = `translate(-50%, -50%) scale(${ wobble })`
  })

  window.what = function() {
    scale.set( 1, { stiffness: 200, damping: 25 })
  }

  messaging.subscribe('PAGE_LEAVE', () => scale.set( 1 , { stiffness: 200, damping: 25 }) )
  messaging.subscribe('PAGE_CHANGED', () => scale.set( 0, { stiffness: 200, damping: 25 }) )
}
