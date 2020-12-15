const { insertMeta, getItemByURL } = require('../../helpers/utils')

const addPostIndexAsParent = function(contentTypes) {
  const blogIndex = getItemByURL( contentTypes.page, '/blog' )

  if (!blogIndex) return contentTypes

  return {
    ...contentTypes,
    post: insertMeta(contentTypes.post, {
      parents: [ blogIndex ],
      breadcrumbs: [ blogIndex ]
    })
  }
}

module.exports = addPostIndexAsParent