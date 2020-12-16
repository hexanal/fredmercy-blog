/**
 * Scss Shit
 */
const sass = require('sass')
const chalk = require('chalk')
const { write } = require('../helpers/files')

module.exports = function() {
  const compiledCSS = sass.renderSync({
    file: './src/scss/style.scss',
    outputStyle: 'compressed',
    sourceMap: process.env === 'development',
    outFile: './public/styles.css'
  })

  const cssTimeElapsed = compiledCSS.stats.duration / 1000

  return write('./public', 'styles.css', compiledCSS.css)
    .then( () => {
      console.log( chalk.magenta(`[build] [sass] built css (in ${cssTimeElapsed} seconds)`) )
    })
}
