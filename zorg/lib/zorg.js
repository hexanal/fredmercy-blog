const fs = require('fs')
const glob = require('glob')

/**
 * - extract the necessary base metadata for each content item
 * - split by `type` of content
 * - apply the plugins
 */
const zorg = function( website, plugins ) {
  const start = Date.now()

  const items = glob.sync( website.contentSrc, {})
  const build = plugins.reduce( (acc, plugin) => plugin(acc, website), items)

  const time = Date.now() - start

  return { build, time }
}

module.exports = zorg
