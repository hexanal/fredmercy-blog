const website = require('./builders/website')
const js = require('./builders/javascript')
const sass = require('./builders/sass')
const assets = require('./builders/assets')

const build = function() {
  website.build()
  js.build()
  sass.build()
  assets.build()
}

const watch = function() {
  website.watch()
  js.watch()
  sass.watch()
  assets.watch()
}

if ( process.argv.includes('--build') ) build()
if ( process.argv.includes('--watch') ) watch()

module.exports = { build, watch }
