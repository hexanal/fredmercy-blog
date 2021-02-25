const groupBy = require('lodash.groupby')

const addPostsByMonth = function( contentTypes ) {

  return {
    ...contentTypes,
    page: contentTypes.page.map( page => {
      if ( page.meta.url === '/blog' || page.meta.url === '/fr/blogue' ) {
        const posts = contentTypes.post.filter( post => post.meta.lang === page.meta.lang )
        const postsByMonth = groupBy(posts, 'meta.archive')

        return { ...page, postsByMonth }
      }

      return page
    })
  }
}

module.exports = addPostsByMonth
