const { insertData, pipe } = require('./utils')
const groupBy = require('lodash.groupby')

// TODO think about this: we have items, which is all the items for a contentTypes
// but each of those is a data object passed to a template
// ... how to distinguish both, and maybe clarify this middleware application process?

const addPostsByMonth = function(contentTypes) {
  const posts = contentTypes.find(type => type.id === 'posts').items;

  return insertData(contentTypes, {
    postsByMonth: groupBy(posts, 'meta.archive')
  })
}

// create an object that lists all the contentTypes with their items, like `{ 'type1': [...], 'type2': [...] }`
// -> this is to pass it to the data for each item that we want to render as a file, so that it can access everything from the other content types!
const applyCombinedData = function(contentTypes) {
  const global = contentTypes.reduce( (acc, type) => {
    return {
      ...acc,
      [type.id]: type.items
    }
  }, {})

  return contentTypes.map( type => {
    return {
      ...type,
      items: type.items.map( item => ({ ...item, global }) )
    }
  })
}

const applyWriteHTML = function(contentTypes) {
  return contentTypes.map( type => {
    type.renderer( type.items )

    return type
  })
}

const build = function(contentTypes) {
  const middlewares = [ addPostsByMonth, applyCombinedData, applyWriteHTML ]

  return pipe(middlewares)(contentTypes)
}

module.exports = {
  build
}