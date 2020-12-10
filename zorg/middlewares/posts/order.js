const orderBy = require('lodash.orderby')

const orderPosts = function( contentTypes ) {
  return {
    ...contentTypes,
    post: orderBy(contentTypes.post, 'meta.date', 'desc')
  }
}

module.exports = orderPosts
