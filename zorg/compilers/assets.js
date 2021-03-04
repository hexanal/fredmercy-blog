const fse = require('fs-extra')
const chalk = require('chalk')
const watcher = require('../bin/watcher')

const WATCH = [
  './src/theme/images',
  './src/theme/fonts'
]
const assets = [
  {
    id: 'manifest',
    src: './src/theme/manifest.webmanifest',
    dest: './public/manifest.webmanifest',
  },
  {
    id: 'images',
    src: './src/theme/images',
    dest: './public/assets/images',
  },
  {
    id: 'fonts',
    src: './src/theme/fonts',
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
