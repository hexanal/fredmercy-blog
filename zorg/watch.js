const chokidar = require('chokidar')
const chalk = require('chalk')

const website = require('../config')
const compilerJS = require('./compilers/javascript')
const compilerSass = require('./compilers/sass')
const compilerAssets = require('./compilers/assets')

const addWatcher = function({ glob, type, callback }) {
  const watcher = chokidar.watch(glob, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  return watcher
    .on('ready', () => console.log( chalk.yellow(`[watch] [${type}] [watching]`)) )
    .on('change', path => {
      console.log( chalk.yellow(`[watch] [${type}] ${path}`) )
      callback()
    })
}

const watchContent = function() {
  addWatcher({
    glob: [
      './content/**/*.(md|json)',
      './src/**/*.html'
    ],
    type: 'content',
    callback: website.build
  })
}

const watchJavascript = function() {
  addWatcher({
    glob: [
      './src/js/**/*.js'
    ],
    type: 'js',
    callback: compilerJS
  })
}

const watchSass = function() {
  addWatcher({
    glob: [
      './src/scss/**/*.scss'
    ],
    type: 'sass',
    callback: compilerSass
  })
}

const watchAssets = function() {
  addWatcher({
    glob: [
      './src/assets/**/*'
    ],
    type: 'assts',
    callback: compilerAssets
  })
}


const watchAll = function() {
  watchContent()
  watchJavascript()
  watchSass()
  watchAssets()
}

module.exports = watchAll
