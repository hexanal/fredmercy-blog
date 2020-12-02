const fs = require('fs')
const frontMatter = require('front-matter')
const glob = require('glob')
const { pipe } = require('./tasks/utils')

const middlewares = {
  'adjacents': require('./tasks/middlewares/posts/adjacents'),
  'comments': require('./tasks/middlewares/posts/comments'),
  'order': require('./tasks/middlewares/posts/order'),
  'post-meta': require('./tasks/middlewares/posts/post-meta'),

  'page-meta': require('./tasks/middlewares/pages/page-meta'),
  'relationship': require('./tasks/middlewares/pages/relationship'),
}
const contentFiles = glob.sync('./content/**/*.md', {})
const contentTypes = [
  {
    id: 'post',
    middlewares: ['post-meta', 'comments', 'order', 'adjacents']
  },
  {
    id: 'page',
    middlewares: ['page-meta', 'relationship']
  }
]
const globalMiddlewares = [
  // require('./tasks/middlewares/global/post-index-as-parent'),
  require('./tasks/middlewares/global/posts-by-months'),
  require('./tasks/middlewares/global/export-to-json'),
]


// TODO extract those functions into a "core" folder or something
// try to make it super lean

/**
 * - go through `contentFiles`
 * - read file for each path
 * - extract front-matter
 * - rename to match our nomenclature
 * - return { meta, content }
 */
const getBasicMeta = function( contentFiles ) {
  return contentFiles.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const { attributes, body } = frontMatter( file.toString() )
    // const { title, description, type, template, useJSON, use } = attributes

    return {
      _filePath: item, // provide the path to the file, just in case we'd want to use it (e.g. in "post-meta")
      meta: { // rename attributes to "meta"
        ...attributes
      },
      content: body // rename body to "content"
    }
  })
}

/**
 * - given all the items
 * - categorize by the meta `type`
 * - return an object which keys are each `type` of content we've found, and
 *   which values are arrays of items
 */
const splitByType = function( items ) {
  return items.reduce( (acc, item) => {
    const { type } = item.meta

    if ( !type ) return acc // TODO error message for when we're not specifying the type of content?

    if ( !acc[type] ) acc[type] = []

    acc[type].push( item )

    return acc
  }, {})
}

/**
 * - go through the predefined types of content
 * - apply the necessary middlewares to the items of each type
 */
const applyMiddlewares = function( itemsByType ) {
  const byType = {}

  contentTypes.forEach( type => { // map through the possible content types defined in this file
    const middlewaresForType = type.middlewares.map( id => middlewares[id] )
    const items = itemsByType[type.id]
    const augmentedItems = pipe( middlewaresForType )( items ) // apply each middleware to the items

    byType[type.id] = augmentedItems
  })

  return byType
}
const applyGlobalMiddlewares = function( itemsByType ) {
  return pipe( globalMiddlewares )( itemsByType )
}

const byTypes = splitByType( getBasicMeta( contentFiles ) )

const withMiddlewares = applyMiddlewares( byTypes )
const withGlobalMiddlewares = applyGlobalMiddlewares( withMiddlewares )

// console.log( withGlobalMiddlewares )
