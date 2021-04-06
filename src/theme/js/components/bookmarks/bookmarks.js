// import Mousetrap from 'mousetrap'
// import stater from '../tools/stater'
// import reefer, { onReef } from '../tools/reefer'
import { getHashes, getHash } from '../../tools/hashish'

export default function({ element, ui, control, messaging }) {
  const state = {
    filtered: [],
    bookmarks: [],
    tag: false,
  }
  // const animation = { shadow: reefer(0) }

  const main = function() {
    ui.bookmark.map( bookmark => {
      const { id, title, tag, rating, source } = bookmark.dataset
      state.bookmarks.push({ id, title, tag, rating, source })
      state.filtered.push({ id, title, tag, rating, source })
    })

    window.addEventListener('hashchange', onHashChange, false)
    onHashChange()
  }

  const onHashChange = function() {
    const tag = getHash('tagged')
    filterByTag( tag )
  }

  const filterByTag = function( tag ) {
    state.filtered = state.bookmarks.filter( bookmark => {
      return bookmark.tag === tag
    })

    ui.tag.map( tagSection => {
      tagSection.style.display = tag && tagSection.dataset.tag !== tag
        ? 'none'
        : 'block'
    })
  }

  main()

  // onReef( function() { })
  // state.active.changed( active => { })
  // messaging.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)


  // return function() {
    // messaging.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  // }
}
