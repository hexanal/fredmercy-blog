const getBasicMeta = item => {
  if ( !item ) return null
  const { title, url, description } = item.meta
  return { meta: { title, url, description } }
}

const addAdjacents = function( contentTypes ) {
  if ( !contentTypes.post ) return contentTypes // if no blog post yet

  const items = contentTypes.post

  return {
    ...contentTypes,
    post: items.map( (item, index) => {
      const copy = { ...item }

      copy.meta.previous = getBasicMeta( items[ index + 1 ] )
      copy.meta.next = getBasicMeta( items[ index - 1 ] )

      return copy
    })
  }
}


module.exports = addAdjacents
