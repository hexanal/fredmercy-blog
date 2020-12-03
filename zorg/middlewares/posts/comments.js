module.exports = function comments( items ) {
  return items.map( item => {
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
}
