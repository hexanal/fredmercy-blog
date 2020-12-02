module.exports = function adjacents( items ) {
  return items.map( (item, index) => {
    console.log( item.meta )

    const copy = {...item}

    copy.meta.previous = items[ index + 1 ] || null
    copy.meta.next = items[ index - 1 ] || null


    return copy
  })
}
