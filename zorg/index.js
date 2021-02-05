const website = require('./compilers/website')
const js = require('./compilers/javascript')
const sass = require('./compilers/sass')
const assets = require('./compilers/assets')

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
