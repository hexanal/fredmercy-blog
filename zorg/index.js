const log = require('./lib/log')
const website = require('./website')
const sass = require('./sass')
const assets = require('./assets')

const build = function() {
  log('building into /public')

  return Promise.all([
    website.build(),
    sass.build(),
    assets.build()
  ])
}

const watch = function() {
  console.log('~~')
  log('watching for changes in source files')

  return Promise.all([
    website.watch(),
    sass.watch(),
    assets.watch()
  ])
}

// when calling zorg through node directly
if ( process.argv.includes('--build') ) build()
if ( process.argv.includes('--watch') ) watch()

// when using zorg from other scripts
module.exports = { build, watch }
