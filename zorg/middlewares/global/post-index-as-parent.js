const { getItemByURL } = require('../../bin/utils')

const addPostIndexAsParent = function( contentTypes ) {
  const indexes = {
    en: getItemByURL( contentTypes.page, '/blog' ),
    fr: getItemByURL( contentTypes.page, '/fr/blogue' )
  }

  if (!indexes.en && !indexes.fr) return contentTypes

  return {
    ...contentTypes,
    post: contentTypes.post.map( item => ({
      ...item,
      meta: {
        ...item.meta,
        parents: [ indexes[item.meta.lang] ],
        breadcrumbs: [ indexes[item.meta.lang] ]
      }
    }) )
  }
}

module.exports = addPostIndexAsParent