const { getPageByURL, insertData, insertMetaForContentType, pipe } = require('./utils')
const groupBy = require('lodash.groupby')

// TODO think about this... we have:
// - `items`, which is all the items for a contentTypes
// ... but we loop through all of these, and pass it to a template
// ... how to distinguish both?, and maybe clarify this middleware application process?
// could have a middlewares folder or something, or straight up in an array?

const addPostsByMonth = function(contentTypes) {
  const posts = contentTypes.find(type => type.id === 'posts').items

  return insertData(contentTypes, {
    postsByMonth: groupBy(posts, 'meta.archive')
  })
}

const addPostIndexAsParent = function(contentTypes) {
  const pages = contentTypes.find(({id}) => id === 'pages').items
  const blogIndex = getPageByURL('/blog', pages)

  return insertMetaForContentType(contentTypes, 'posts', {
    parents: [ blogIndex ]
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

  return insertData(contentTypes, { global })
}

const applyWriteHTML = function(contentTypes) {
  return contentTypes.map( type => {
    type.renderer( type.items )

    return type
  })
}

const build = function(contentTypes) {
  const middlewares = [ addPostsByMonth, addPostIndexAsParent, applyCombinedData, applyWriteHTML ]

  return pipe(middlewares)(contentTypes)
}

module.exports = {
  build
}