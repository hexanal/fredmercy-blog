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
  build();
  console.log('~~')
  log('watching for changes in source files')

  return Promise.all([
    website.watch(),
    sass.watch(),
    assets.watch()
  ])
}

// if ( process.argv.includes('-b') ) build()
// if ( process.argv.includes('-w') ) watch()

module.exports = function( env ) {
  // return Promise.all([
    // env === 'development' ? watch() : [],
    if (env === 'development') {
      watch()
    }
    build() // compile the necessary stuff
  // ])
}
