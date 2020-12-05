const fs = require('fs')
const frontMatter = require('front-matter')
const glob = require('glob')
const { pipe } = require('./zorg/utils')

const start = Date.now()

const middlewares = {
  'content': require('./zorg/middlewares/global/content'),
  'html': require('./zorg/middlewares/global/html'),

  'adjacents': require('./zorg/middlewares/posts/adjacents'),
  'comments': require('./zorg/middlewares/posts/comments'),
  'order': require('./zorg/middlewares/posts/order'),
  'post-meta': require('./zorg/middlewares/posts/post-meta'),

  'page-meta': require('./zorg/middlewares/pages/page-meta'),
  'relationship': require('./zorg/middlewares/pages/relationship'),
  'json': require('./zorg/middlewares/pages/json'),
}
const contentFiles = glob.sync('./content/**/*.md', {})
const contentTypes = [
  {
    id: 'post',
    html: 'templates/post',
    middlewares: ['post-meta', 'content', 'comments', 'order', 'adjacents']
  },
  {
    id: 'page',
    html: 'templates/page',
    middlewares: ['page-meta', 'content', 'json', 'relationship']
  }
]
const globalMiddlewares = [
  require('./zorg/middlewares/global/post-index-as-parent'),
  require('./zorg/middlewares/global/posts-by-months'),
  require('./zorg/middlewares/global/export-to-json'),
  require('./zorg/middlewares/global/html'),
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

    return {
      _filePath: item,
      _html: getDefaultHTMLForType( attributes.type ),
      meta: {
        ...attributes
      },
      content: body
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
 * - a content type can have a "default" HTML template
 * - useful when creating a `page` that should simply use the `templates/page.html` template, for example
 */
const getDefaultHTMLForType = function( contentType ) {
  const type = contentTypes.find(t => t.id === contentType)
  if (!type) return console.log(`[error] type “${contentType}” isn't defined`)

  return type.html
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

/**
 * - apply the global middlewares to the global contentTypes object
 */
const applyGlobalMiddlewares = function( itemsByType ) {
  return pipe( globalMiddlewares )( itemsByType )
}

/**
 * - collating all the data:
 *   - extracting the necessary base metadata
 *   - splitting by `type`
 *   - applying the middlewares of each content type
 *   - applying the global middlewares
 */
const byTypes = splitByType( getBasicMeta( contentFiles ) )
const withMiddlewares = applyMiddlewares( byTypes )
const withGlobalMiddlewares = applyGlobalMiddlewares( withMiddlewares )

const end = Date.now()
const timeDiff = (end - start) / 1000

console.log(`[info] done (in ${timeDiff} seconds)`)
