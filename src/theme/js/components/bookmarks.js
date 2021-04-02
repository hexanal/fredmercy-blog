// import Mousetrap from 'mousetrap'
// import stater from '../tools/stater'
// import reefer, { onReef } from '../tools/reefer'

export default function({ element, ui, control, messaging }) {
  const state = {
    filtered: [],
    bookmarks,
    tag: false,
  }
  // const animation = { shadow: reefer(0) }

  const init = function() {

    ui.bookmarks.forEach( bookmark => {
      const { id, title, rating, source } = bookmark.dataset
      state.bookmarks[id] = { id, title, rating, source }
      state.filtered[id] = { id, title, rating, source }
    })
  }

  const filterByTag = function( tag ) {
    state.filtered = state.bookmarks.filter( bookmark => {
      return bookmark.tag === tag
    })
  }

  messaging.subscribe('FILTER_BY_TAG', filterByTag)

  // onReef( function() { })
  // state.active.changed( active => { })
  // messaging.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

  // return function() {
    // messaging.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  // }
}
