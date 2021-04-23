const website = require('./builders/website')
const sass = require('./builders/sass')
const assets = require('./builders/assets')

const build = function() {
	console.log(`[fredmercy] -> building into /public`)

  website.build()
  sass.build()
  assets.build()
}

const watch = function() {
  console.log(`~~`)
  console.log(`[fredmercy] -> watching for changes in source files`)

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
