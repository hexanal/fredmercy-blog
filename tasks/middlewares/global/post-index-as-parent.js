const { insertMeta, getItemByURL } = require('../../utils')

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