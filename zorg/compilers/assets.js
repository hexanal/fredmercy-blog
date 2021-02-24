const fse = require('fs-extra')
const chalk = require('chalk')
const watcher = require('../bin/watcher')

const WATCH = [
  './src/assets/images',
  './src/assets/fonts'
]
const assets = [
  {
    id: 'manifest',
    src: './src/assets/manifest.webmanifest',
    dest: './public/assets/manifest.webmanifest',
  },
  {
    id: 'images',
    src: './src/assets/images',
    dest: './public/assets/images',
  },
  {
    id: 'fonts',
    src: './src/assets/fonts',
    dest: './public/assets/fonts'
  }
]

const build = function() {
  const copy = ({id, src, dest}) => fse.copy(src, dest)
    .then(() => {
      console.log( chalk.magenta(`[compiler] [assets/${id}]`) )
    })
    .catch(err => {
      console.log( chalk.red(`[compiler] [assets/${id}] [error] something broke while copying the assets...`) )
      console.error( err )
    })

  return assets.map( copy )
}

const watch = watcher({
  glob: WATCH,
  type: 'assets',
  callback: build
})

module.exports = { build, watch }
