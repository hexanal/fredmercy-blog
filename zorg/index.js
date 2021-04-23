const website = require('./builders/website')
const sass = require('./builders/sass')
const assets = require('./builders/assets')

const build = function() {
  website.build()
  sass.build()
  assets.build()
}

const watch = function() {
  website.watch()
  sass.watch()
  assets.watch()
}

if ( process.argv.includes('--build') ) build()
if ( process.argv.includes('--watch') ) watch()

module.exports = { build, watch }
