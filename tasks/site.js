const { pipe } = require('./utils')
const { writeHTML } = require('./files')

// FIXME the shape of the data `{ posts: { items: [], build: fn => 'what' }`
// is not good at all: I need to make it as easy as possible to add stuff to each item so that the template gets the right data


// TODO
const getPostCategories = function(contentTypes) {
  return contentTypes.map( type => {
    return {
      ...type,
      items: type.items.map( item => {
        return {
          ...item,
          hey: `what's up`,
          categories: ['one', 'two']
        }
      })
    }
  })
}

const applyCombinedData = function(contentTypes) {
  const global = contentTypes.reduce( (acc, type) => {
    return {
      ...acc,
      [type.type]: type.items // TODO type.type, really?
    }
  }, {})

  // TODO explain how that works, or make 'global' into a function (less performance I think but hey...)
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


const applyMiddlewares = function(types, middlewares) {
  return pipe(middlewares)(types)
}

const build = function(contentTypes) {
  const middlewares = [ getPostCategories, applyCombinedData, applyWriteHTML ]
  const withMiddlewares = applyMiddlewares(contentTypes, middlewares)

  return withMiddlewares; // TODO needed?
}

module.exports = {
  build
}