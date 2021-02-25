const orderBy = require('lodash.orderby')

const orderPosts = function( contentTypes ) {
  if ( !contentTypes.post ) return contentTypes // if no blog post yet

  return {
    ...contentTypes,
    post: orderBy(contentTypes.post, 'meta.date', 'desc')
  }
}

module.exports = orderPosts
