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

module.exports = function adjacents( items ) {
  return items.map( (item, index) => {
    const copy = {...item}

    copy.meta.previous = extractBasicMeta( items[ index + 1 ] )
    copy.meta.next = extractBasicMeta( items[ index - 1 ] )

    return copy
  })
}
