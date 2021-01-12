const addComments = function( contentTypes ) {
  const items = contentTypes.post

  return {
    ...contentTypes,
    post: items.map( item => {
      const entryId = item.meta.date

      const comments = []

      // FIXME
      if ( item.meta.comments !== false ) {
        for (let i = 1; i <= 25; i++) {
          comments.push({
            entryId,
            index: i,
            commentId: `${entryId}_${i}`
          })
        }
      }

      return {
        ...item,
        comments
      }
    })
  }
}

module.exports = addComments
