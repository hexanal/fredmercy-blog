const fs = require('fs')
const frontMatter = require('./frontmatter')
const glob = require('glob')
const { getFilenameFromPath, getFormattedTimestamp } = require('./utils')

/**
 * - go through `contentFiles`
 * - read file for each path
 * - extract front-matter
 * - rename to match our nomenclature
 * - return { meta, body } and other "developer" keys
 */
const getBasicMeta = function( contentFiles, websiteConfig ) {
  return contentFiles.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const { attributes, body } = frontMatter( file.toString() )
    const defaultAttributes = getDefaultAttributes( attributes, item )

    // only handle drafts when in dev mode
    if ( process.env.NODE_ENV !== 'development' && defaultAttributes.draft ) return

    return {
      _filePath: item,
      _info: {
        built: getFormattedTimestamp( Date.now() ),
      },
      meta: {
        baseURL: websiteConfig.baseURL,
        lang: websiteConfig.locale,
        ...defaultAttributes,
        ...attributes
      },
      body
    }
  })
}

/**
 * - given the front-matter attributes from a Markdown content page
 * - extract what we can
 * - set up sensible default when data is missing
 */
const getDefaultAttributes = function( attributes, item ) {
  const { type, title, description, draft } = attributes

  return {
    id: getFilenameFromPath( item ).replace('.md', ''),
    type: type || 'page',
    title: title || getFilenameFromPath( item ).replace('.md', ''),
    description: description || '',
    draft: draft || false,
  }
}


/**
 * - given all the items
 * - categorize by the meta `type`
 * - return an object which keys are each `type` of content we've found, and whose values is an array of items of that type
 */
const splitByType = function( items ) {
  return items.reduce( (acc, item) => {
    if ( !item ) return acc // TODO

    const { type } = item.meta

    if ( !type ) return acc['page'].push( item ) // type wasn't specified... default back to a 'page' type

    if ( !acc[type] ) acc[type] = [] // accumulator needs to be initialized with an empty array :)

    acc[type].push( item )

    return acc
  }, {})
}

/**
 * - extract the necessary base metadata for each content item
 * - split by `type` of content
 * - apply the plugins
 */
const zorg = function( website, plugins ) {
  const start = Date.now()

  const contentFiles = glob.sync( website.contentSrc, {})
  const contentTypes = splitByType( getBasicMeta( contentFiles, website ) )
  const build = plugins.reduce( (acc, plugin) => plugin(acc, website), contentTypes)

  const end = Date.now()
  const time = (end - start) / 1000

  return { build, time }
}

module.exports = zorg
