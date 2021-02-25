const fs = require('fs')
const frontMatter = require('front-matter')
const glob = require('glob')
const { getFilenameFromPath, pipe } = require('./utils')

const DEFAULT_LOCALE = 'en'

/**
 * - go through `contentFiles`
 * - read file for each path
 * - extract front-matter
 * - rename to match our nomenclature
 * - return { meta, content }
 */
const getBasicMeta = function( contentFiles, lang ) {
  return contentFiles.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const { attributes, body } = frontMatter( file.toString() )
    const defaultAttributes = getDefaultAttributes( attributes, item )

    return {
      _filePath: item,
      meta: {
        root: lang === DEFAULT_LOCALE ? '/' : `/${ lang }`,
        lang,
        ...defaultAttributes,
        ...attributes
      },
      content: body
    }
  })
}

/**
 * - given the front-matter attributes from a Markdown content page
 * - extract what we can
 * - set up sensible default when data is missing
 */
const getDefaultAttributes = function( attributes, item ) {
  const { type, title, description } = attributes

  return {
    type: type || 'page',
    title: title || getFilenameFromPath( item ).replace('.md', ''),
    description: description || ''
  }
}


/**
 * - given all the items
 * - categorize by the meta `type`
 * - return an object which keys are each `type` of content we've found, and whose values is an array of items of that type
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

const zorg = function( locales, plugins ) {
  const start = Date.now()

  const websites = locales.map( lang => {
    const contentFiles = glob.sync(`./src/content/${lang}/**/*.md`, {})
    /**
     * - collating all the data:
     *   - extracting the necessary base metadata
     *   - splitting by `type`
     *   - applying the plugins of each content type
     *   - applying the global plugins
     */
    const contentTypes = splitByType( getBasicMeta( contentFiles, lang ) )

    return pipe( plugins )( contentTypes )
  })

  const end = Date.now()
  const time = (end - start) / 1000

  return { websites, time }
}

module.exports = zorg
