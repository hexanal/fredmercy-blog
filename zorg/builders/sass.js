const sass = require('sass')
const importer = require('node-sass-glob-importer')
const { write } = require('../lib/files')
const watcher = require('../lib/watcher')

const WATCH_GLOB = [ './src/**/*.scss' ] // absolutely anywhere there's Sass
const SRC = './src/theme/styles/fredmercy.scss'
const DEST_PATH = './public'
const DEST_FILENAME = 'fredmercy.css'
const DEST = `${DEST_PATH}/${DEST_FILENAME}`

const build = function() {
  const compiledCSS = sass.renderSync({
    importer: importer(),
    file: SRC,
    outputStyle: 'compressed',
    sourceMap: process.NODE_ENV === 'development',
    outFile: DEST
  })

  const cssTimeElapsed = compiledCSS.stats.duration / 1000

  return write(DEST_PATH, DEST_FILENAME, compiledCSS.css)
    .then( () => {
      console.log( `[fredmercy] compiled sass, in ${cssTimeElapsed} seconds` )
    })
}

const watch = watcher({
  glob: WATCH_GLOB,
  type: 'sass',
  callback: build
})

module.exports = { build, watch }
