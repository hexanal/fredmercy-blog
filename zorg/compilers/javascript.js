const esbuild = require('esbuild')
const chalk = require('chalk')
const watcher = require('../bin/watcher')

const WATCH_GLOB = [
  './src/js/**/*.js',
]
const SRC = ['./src/js/app.js']
const DEST = './public/app.js'

const build = function() {
  const js = esbuild.buildSync({
    entryPoints: SRC,
    bundle: true,
    target: 'es2018',
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development',
    outfile: DEST
  })

  if (!js.warnings.length) {
    console.log( chalk.magenta(`[compiler] [js] [env: ${process.env.NODE_ENV}]`) )
  }
}

const watch = watcher({
  glob: WATCH_GLOB,
  type: 'js',
  callback: build
})

module.exports = { build, watch }
