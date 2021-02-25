const addAdjacents = function( contentTypes ) {
  if ( !contentTypes.post ) return contentTypes // if no blog post yet

  const items = contentTypes.post

  return {
    ...contentTypes,
    post: items.map( (item, index) => {
      const copy = { ...item }

      copy.meta.previous = extractBasicMeta( items[ index + 1 ] )
      copy.meta.next = extractBasicMeta( items[ index - 1 ] )

      return copy
    })
  }
}

const extractBasicMeta = item => {
  if ( !item ) return null

  const { title, url, description } = item.meta

  return {
    meta: {
      title,
      url,
      description
    }
  }
}

module.exports = addAdjacents
