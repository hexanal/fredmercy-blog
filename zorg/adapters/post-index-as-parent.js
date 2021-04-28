const getItemByURL = (items, url) => items.find( item => item.meta.url === url )

const getMetaWithIndexAsParent = function( item, indexes ) {
  const parentIndex = indexes[item.meta.lang]

  // modifying the parent URL (the blog index) to include the anchor!
  const parentItem = {
    ...parentIndex,
    meta: {
      ...parentIndex.meta,
      url: `${parentIndex.meta.url}/#${item.meta.id}`
    }
  }

  return {
    ...item.meta,
    parents: [ parentItem ],
    breadcrumbs: [ parentItem ]
  }
}

const addPostIndexAsParent = function( items ) {
  const indexes = {
    en: getItemByURL( items, '/blog' ),
    fr: getItemByURL( items, '/fr/blogue' )
  }

  if (!indexes.en && !indexes.fr) return items

  return items.map( item => {
    if (item.meta.type !== 'post' ) return item

    return {
      ...item,
      meta: getMetaWithIndexAsParent(item, indexes)
    }
  })
}

module.exports = addPostIndexAsParent