const fs = require('fs')
const frontMatter = require('front-matter')
const glob = require('glob')
const { pipe } = require('./utils')

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
 * - apply the global middlewares to the global contentTypes object
 */
const applyMiddlewares = function( itemsByType, middlewares ) {
  return pipe( Object.values( middlewares ) )( itemsByType )
}

const generate = function( middlewares ) {
  const start = Date.now()
  const contentFiles = glob.sync('./content/**/*.md', {})
  /**
   * - collating all the data:
   *   - extracting the necessary base metadata
   *   - splitting by `type`
   *   - applying the middlewares of each content type
   *   - applying the global middlewares
   */
  const byTypes = splitByType( getBasicMeta( contentFiles ) )
  const withMiddlewares = applyMiddlewares( byTypes, middlewares )

  const end = Date.now()
  const timeDiff = (end - start) / 1000

  console.log(`[info] done (in ${timeDiff} seconds)`)
}


const builder = function() {
  let middlewares = {}

  const use = function( middlewaresToUse ) {
    middlewares = middlewaresToUse
  }

  return {
    use,
    build: () => generate(middlewares)
  }
}

module.exports = builder
