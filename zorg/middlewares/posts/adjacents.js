const addAdjacents = function( contentTypes ) {
  const withAdjacents = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    if ( type !== 'post' ) withAdjacents[type] = contentTypes[type] // TODO improve this part, I guess

    const items = contentTypes[type]

    withAdjacents[type] = items.map( (item, index) => {
      const copy = { ...item }

      copy.meta.previous = extractBasicMeta( items[ index + 1 ] )
      copy.meta.next = extractBasicMeta( items[ index - 1 ] )

      return copy
    })
  })

  return withAdjacents
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
