const extractBasicMeta = items => {
  return items.map( item => {
    const { title, url, description } = item.meta

    return {
      meta: {
        title,
        url,
        description
      }
    }
  })
}

const applyRelationships = function( items ) {
  return items.map( (item, index) => {
    const children = getChildrenItems( item, index, items )
    const parents = getParentItems( item, index, items )

    item.meta.children = children
    item.meta.parents = parents.reverse()
    item.meta.breadcrumbs = parents

    return item
  })
}

const getChildrenItems = function( item, index, items ) {
  if (item.meta.id === 'home') return []; // don't bother finding children for home: it has them all anyway

  const children = items.filter( candidateItem => {
    const isSameRoute = candidateItem.meta.id === item.meta.id
    const isPartOfRoute = candidateItem.meta.url.includes( item.meta.url )
    if (isSameRoute || !isPartOfRoute) return false

    return candidateItem.meta.url.replace( item.meta.url, '') // will be falsy if it leaves "leftover" routes
  })

  return extractBasicMeta( children )
}

const getParentItems = function( item, index, items ) {
  if (item.meta.isHome) return []; // don't bother finding parents for home: it has none

  const parents = items.filter( candidateItem => {
    if (candidateItem.meta.isHome) return false // nope
    const isSameRoute = candidateItem.meta.id === item.meta.id
    const isSharedRoute = item.meta.url.includes( candidateItem.meta.url )

    return !isSameRoute && isSharedRoute
  })

  return extractBasicMeta( parents )
}

module.exports = applyRelationships