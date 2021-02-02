const fse = require('fs-extra')
const chalk = require('chalk')
const watcher = require('../bin/watcher')

const WATCH_GLOB = ['./src/assets/**/*']
const SRC = './src/assets'
const DEST = './public/assets'

const build = function() {
  return fse.copy(SRC, DEST)
    .then(() => {
      console.log( chalk.magenta(`[compiler] [assets]`) )
    })
    .catch(err => {
      console.log( chalk.red(`[compiler] [assets] [error] something broke while copying the assets folder...!`) )
      console.error( err )
    })
}

const watch = watcher({
  glob: WATCH_GLOB,
  type: 'assets',
  callback: build
})

module.exports = { build, watch }
