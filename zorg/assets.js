const fse = require('fs-extra')
const log = require('./lib/log')
const watcher = require('./lib/watcher')

const WATCH = [
  './src/theme/js/**/*',
  './src/theme/images/**/*',
  './src/theme/fonts/**/*',
]
const assets = [
  {
    id: 'js',
    src: './src/theme/js',
    dest: './public/assets/js'
  },
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
  },
]

const copy = ({id, src, dest}) => {
  const start = Date.now()

  return fse.copy(src, dest)
    .then(() => {
      const time = Date.now() - start
      log( `assets: copied '${id}' ~~ ${time}ms` )
    })
    .catch(err => {
      log( `assets: huh?! something broke while copying assets: '${id}'` )
      console.error( err )
    })
  }

const build = function() {
  return assets.map( copy )
}

const watch = watcher({
  glob: WATCH,
  type: 'assets',
  callback: build
})

module.exports = { build, watch }
