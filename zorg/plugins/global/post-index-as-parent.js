const { getItemByURL } = require('../../bin/utils')

const addPostIndexAsParent = function( contentTypes ) {
  const indexes = {
    en: getItemByURL( contentTypes.page, '/blog' ),
    fr: getItemByURL( contentTypes.page, '/fr/blogue' )
  }

  if (!indexes.en && !indexes.fr) return contentTypes

  return {
    ...contentTypes,
    post: contentTypes.post.map( item => {
      const parentIndex = indexes[item.meta.lang]

      // modifying the URL for the index to include the anchor!
      const parentItem = {
        ...parentIndex,
        meta: {
          ...parentIndex.meta,
          url: `${parentIndex.meta.url}/#${item.meta.id}`
        }
      }

      return {
        ...item,
        meta: {
          ...item.meta,
          parents: [ parentItem ],
          breadcrumbs: [ parentItem ]
        }
      }

    } )
  }
}

module.exports = addPostIndexAsParent