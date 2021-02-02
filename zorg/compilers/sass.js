const sass = require('sass')
const chalk = require('chalk')
// const importer = require('node-sass-glob-importer')
const { write } = require('../bin/files')
const watcher = require('../bin/watcher')

const WATCH_GLOB = [
  './src/**/*.scss',
]
const SRC = './src/scss/style.scss'
const DEST_PATH = './public'
const DEST_FILENAME = 'styles.css'
const DEST = `${DEST_PATH}/${DEST_FILENAME}`

const build = function() {
  const compiledCSS = sass.renderSync({
    // importer: importer(),
    file: SRC,
    outputStyle: 'compressed',
    sourceMap: process.NODE_ENV === 'development',
    outFile: DEST
  })

  const cssTimeElapsed = compiledCSS.stats.duration / 1000

  return write(DEST_PATH, DEST_FILENAME, compiledCSS.css)
    .then( () => {
      console.log( chalk.magenta(`[compiler] [sass] built in ${cssTimeElapsed} seconds`) )
    })
}

const watch = watcher({
  glob: WATCH_GLOB,
  type: 'styles',
  callback: build
})

module.exports = { build, watch }
