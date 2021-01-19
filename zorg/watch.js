const website = require('../config')
const watcher = require('./helpers/watcher')
const compileJS = require('./compilers/javascript')
const compileSass = require('./compilers/sass')
const compileAssets = require('./compilers/assets')

const watch = function() {
  watcher({
    glob: [ './content/**/*.(md|json)', './src/**/*.html' ],
    type: 'content',
    callback: website.build
  })

  watcher({
    glob: [ './src/js/**/*.js' ],
    type: 'js',
    callback: compileJS
  })

  watcher({
    glob: [ './src/**/*.scss' ],
    type: 'sass',
    callback: compileSass
  })

  watcher({
    glob: [ './src/assets/**/*' ],
    type: 'assets',
    callback: compileAssets
  })
}

module.exports = watch
