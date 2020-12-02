const applyRelationships = function( pages ) {
  return pages.map( (page, index) => {
    const children = getChildrenPages( page, index, pages )
    const parents = getParentPages( page, index, pages )

    // TODO can we not mutate here? does it matter?
    page.meta.children = children
    page.meta.parents = parents
    page.meta.breadcrumbs = parents.reverse()

    return page
  })
}

const getChildrenPages = function( page, index, pages ) {
  if (page.meta.id === 'home') return []; // don't bother finding children for home: it has them all anyway

  const children = pages.filter( candidatePage => {
    const isSameRoute = candidatePage.meta.id === page.meta.id
    const isPartOfRoute = candidatePage.meta.url.includes( page.meta.url )
    if (isSameRoute || !isPartOfRoute) return false

    return candidatePage.meta.url.replace( page.meta.url, '') // will be falsy if it leaves "leftover" routes
  })

  return children
}

const getParentPages = function( page, index, pages ) {
  if (page.meta.id === 'home') return []; // don't bother finding parents for home: it has none

  const parents = pages.filter( possibleParentPage => {
    if (possibleParentPage.meta.id === 'home') return false // nope
    const isSameRoute = possibleParentPage.meta.id === page.meta.id
    const isSharedRoute = page.meta.url.includes( possibleParentPage.meta.url )

    return !isSameRoute && isSharedRoute
  }).reverse()

  return parents
}

module.exports = applyRelationships
