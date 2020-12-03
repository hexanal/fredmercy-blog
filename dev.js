const chokidar = require('chokidar')
const { build } = require('./zorg/site')
const posts = require('./zorg/posts')
const pages = require('./zorg/pages')

const watcher = chokidar.watch('./src/**/*.(md|html|json)', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})

watcher
  .on('ready', () => {
    console.log(`[watch] building the website, and watching for changes in the source files!`)
    build([ posts(), pages() ])
  })
  .on('change', path => {
    console.log(`[watch] [change] ${path}`)
    build([ posts(), pages() ])
  })
