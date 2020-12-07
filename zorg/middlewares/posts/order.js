const orderBy = require('lodash.orderby')

const orderPosts = function( contentTypes ) {
  const withOrderedPosts = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    if ( type !== 'post' ) withOrderedPosts[type] = contentTypes[type] // TODO improve this part, I guess

    withOrderedPosts[type] = orderBy(contentTypes[type], 'meta.date', 'desc')
  })

  return withOrderedPosts
}

module.exports = orderPosts
