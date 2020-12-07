const addComments = function( contentTypes ) {
  const withComments = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    if ( type !== 'post' ) withComments[type] = contentTypes[type] // TODO improve this part, I guess

    withComments[type] = contentTypes[type].map( item => {
      const entryId = item.meta.date

      return {
        ...item,
        comments: Array(25).fill(null).map((_, index) => ({
          entryId,
          index: index + 1,
          commentId: entryId + '_' + (index + 1)
        }))
      }
    })
  })

  return withComments
}

module.exports = addComments
