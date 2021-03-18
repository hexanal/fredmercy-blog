export default function({ ui, control }) {
  const state = {
    filters: []
  }

  const bookmarks = [].slice.call( ui['bookmarks'].querySelectorAll('div > ul > li') )

  const tags = bookmarks
    .flatMap( bookmark => {
      const codeTag = bookmark.querySelector('code')
      if (codeTag) return codeTag.textContent.replaceAll(' ', '').split(',') // remove spaces, then split (why not do a trim? meh)
    })
    .filter( (value) => typeof value !== 'undefined')
    .filter( (value, index, self) => self.indexOf(value) === index ) // filter unique

  if ( !tags.length ) return

  const filterButtons = tags.map( tag => {
    const clone = ui['filter-item'].content.cloneNode(true)
    const btn = clone.querySelector('button')

    btn.dataset.tag = tag
    btn.textContent = tag
    btn.addEventListener('click', e => filterBookmarksByTag( e.target.dataset.tag ) )

    ui['filters-list'].appendChild( clone )

    return btn
  })

  const filterBookmarksByTag = tag => {
    const filters = state.filters.includes( tag ) ? removeFilter( tag ) : addFilter( tag )

    applyFilters( filters )
  }

  const enableAll = function() {
    state.filters = [...tags]

    applyFilters( state.filters )
  }
  const disableAll = function() {
    state.filters = []

    applyFilters( state.filters )
  }

  const addFilter = function(tag) {
    state.filters = [...state.filters, tag]
    return state.filters;
  }

  const removeFilter = function(tag) {
    state.filters = state.filters.filter( filter => filter !== tag )

    return state.filters
  }

  const applyFilters = function(filters) {
    // update buttons
    filterButtons.map( btn => {
      const match = filters.includes( btn.dataset.tag )
      btn.dataset.active = match
    })

    // update bookmarks
    bookmarks.map( bookmark => {
      const codeTag = bookmark.querySelector('code')
      const assignedTags = codeTag.textContent.replaceAll(' ', '').split(',')
      const isMatch = assignedTags.reduce( (acc, t) => {
        return acc
          ? acc // it's a match anyway
          : filters.includes( t ) // try again
      }, false)

      bookmark.dataset.filtered = isMatch
    })
  }

  enableAll()

  /**
   * EVENTS
   */
  control['all'].addEventListener('click', enableAll)
  control['none'].addEventListener('click', disableAll)
}
