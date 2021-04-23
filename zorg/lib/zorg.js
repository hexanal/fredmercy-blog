const fs = require('fs')
const glob = require('glob')
const frontMatter = require('./frontmatter')

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
    const defaultAttributes = getDefaultAttributes( attributes, item, websiteConfig )
    const built = getFormattedTimestamp( new Date().toISOString() )
    const updated = getFormattedTimestamp( getFileUpdatedDate(item) )

    // FIXME: use a "draft" adapter for this?
    if ( process.env.NODE_ENV !== 'development' && defaultAttributes.draft ) return

    return {
      _info: {
        src: item,
        updated,
        built
      },
      meta: { ...defaultAttributes, ...attributes },
      body
    }
  })
}

/**
 * - given the front-matter attributes from a Markdown content page
 * - extract what we can
 * - set up sensible default when data is missing
 */
const getDefaultAttributes = function( attributes, item, websiteConfig ) {
  const { type, title, description, draft } = attributes

  return {
    baseURL: websiteConfig.baseURL,
    lang: websiteConfig.locale,
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

/* various utility/formatting functions */
const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path)
  return stats.mtime
}

const getFilenameFromPath = function( filepath ) {
  const route = filepath.replace('./content/', '').split('/')
  return route[route.length - 1]
}

const withLeadingZero = number => {
  const n = number.toString()
  return n.length < 2 ? '0' + n : n
}

const getAmPmTime = date => {
  const originalHours = date.getHours()
  const hoursIn12format = originalHours > 12 ? originalHours - 12 : originalHours
  const hours = hoursIn12format === 0 ? 12 : hoursIn12format
  const minutes = withLeadingZero( date.getMinutes() )
  const suffix = originalHours >= 12 ? 'pm' : 'am'

  return `${hours}:${minutes}${suffix}`
}

const getFormattedTimestamp = function( timestamp ) {
  const date = new Date( timestamp )
  const day = withLeadingZero( date.getUTCDate() )
  const month = withLeadingZero( date.getUTCMonth() )
  const year = date.getUTCFullYear()
  const time = getAmPmTime( date )

  return `${year}-${month}-${day} @ ${time}`
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

  const time = Date.now() - start

  return { build, time }
}

module.exports = zorg
