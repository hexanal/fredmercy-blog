import stepper from './stepper.js'

// TODO - what to export here?
export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const SPRING_SNAP = { stiffness: 420, damping: 20 }
export const SPRING_TIGHT = { stiffness: 350, damping: 16 }
export const SPRING_LOOSE = { stiffness: 400, damping: 12 }
export const SPRING_SOFT = { stiffness: 180, damping: 20 }

// TODO how to dispose of the callbacks?
export function onFrame(fn, timestamp = 0) {
  if ( !prefersReducedMotion ) fn(timestamp) // TODO?

  requestAnimationFrame( function(timestamp) {
    onFrame(fn, timestamp)
  } )
}

export const onReef = onFrame

// TODO extract reefer to be targeting ONE prop at a time; while running the raf?
export default function reefer(startWith = 0) {
  // in state object instead?
  let target = startWith
  let interpolated = startWith
  let currentVelocity = 0
  let spring = { stiffness: 250, damping: 25 }

  // init
  onFrame( () => framer(target, interpolated, currentVelocity) )

  // on every frame, do this
  function framer(target, start = 0, velocity = 0) {
    if (typeof target !== 'number' || typeof start !== 'number') return

    const [nextValue, nextVelocity] = stepper( start, velocity, target, spring.stiffness, spring.damping )

    interpolated = nextValue
    currentVelocity = nextVelocity
  }

  function set(newTarget, newSpring) {
    if ( typeof newTarget !== 'number' ) {
      interpolated = newTarget
      return
    }

    if ( newSpring ) spring = { ...newSpring }

    target = newTarget
  }

  function get() {
    return interpolated
  }

  const methods = {
    setSpring: newSpringConfig => {
      spring = { ...newSpringConfig }
      return methods
    },

    set,
    get,

    getCurrentTarget: () => target,

    instantSet: value => {
      target = value
      interpolated = value
    },

    // withSpring?
    // withInertia? // acceleration?
    // withCubicBezier // change in acceleration?!!??!
  }

  return methods
}
