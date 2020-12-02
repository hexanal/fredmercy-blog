// const { build } = require('./tasks/site')
// const posts = require('./tasks/posts')
// const pages = require('./tasks/pages')

// build([ posts(), pages() ])

const fs = require('fs')
const frontMatter = require('front-matter')
const glob = require('glob')

const middlewares = {
  'adjacent': require('./tasks/middlewares/adjacents'),
  'comments': require('./tasks/middlewares/comments'),
  'order': require('./tasks/middlewares/order'),
  'relationship': require('./tasks/middlewares/relationship'),
}
const contentFiles = glob.sync('./content/**/*.md', {})
const contentTypes = [
  {
    id: 'post',
    middlewares: ['comments', 'order', 'adjacent']
  },
  {
    id: 'page',
    middlewares: ['relationship']
  }
]

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
const splitByTypes = function( items ) {
  const byTypes = {}

  items.forEach( item => {
    const { type } = item.meta

    if ( !type ) {
      byTypes['page'] = [item] // default page? or use something else?
      return
    }

    if ( !byTypes[type] ) {
      byTypes[type] = [item]
      return
    }

    byTypes[type].push( item )
  })

  return byTypes
}

const applyMiddlewares = function( byTypes ) {
  return contentTypes.map( type => { // map through the possible content types defined in this file
    return type.middlewares.map( id => { // map through the middlewares for the current type of content
      // TODO add function check?
      console.log( id, middlewares[id] )
      const middleware = middlewares[id] // grab the right middleware from the imported list
      return middleware( byTypes[type.id] ) // apply each middleware to the items (they're sorted by types)
    })
  })
}

const byTypes = splitByTypes( getBasicMeta( contentFiles ) )

const withMiddlewares = applyMiddlewares( byTypes )

console.log( withMiddlewares )

// console.log( processed )
