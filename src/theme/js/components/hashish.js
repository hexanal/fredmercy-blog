// import Mousetrap from 'mousetrap'
// import stater from '../tools/stater'
// import reefer, { onReef } from '../tools/reefer'

export default function({ element, ui, control, messaging }) {
  const state = {
    parts: []
  }
// const animation = { shadow: reefer(0) }

  const main = function() {
    console.log( window.location.hash )
  }

  main()
  // onReef( function() { })
  // state.active.changed( active => { })
  // messaging.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

  // return function() {
    // messaging.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  // }
}
