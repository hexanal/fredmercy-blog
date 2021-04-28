const log = require('./lib/log')
const website = require('./website')
const sass = require('./sass')
const assets = require('./assets')

const build = function() {
  log('building into /public')

  website.build()
  sass.build()
  assets.build()
}

const watch = function() {
  console.log('~~')
  log('watching for changes in source files')

  website.watch()
  sass.watch()
  assets.watch()
}

if ( process.argv.includes('--build') ) build()
if ( process.argv.includes('--watch') ) watch()

module.exports = function( env ) {
  build() // compile the necessary stuff
  if ( env === 'development' ) setTimeout( () => { watch() }, 1000)
}
