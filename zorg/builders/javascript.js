const esbuild = require('esbuild')
const watcher = require('../lib/watcher')

const WATCH_GLOB = ['./src/theme/**/*.js'] // anywhere there's JS, my friend!
const SRC = ['./src/theme/js/fredmercy.js']
const DEST = './public/fredmercy.js'

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
    console.log( `[fredmercy] compiled js` )
  }
}

const watch = watcher({
  glob: WATCH_GLOB,
  type: 'js',
  callback: build
})

module.exports = { build, watch }
