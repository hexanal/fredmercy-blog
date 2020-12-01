const chokidar = require('chokidar')
const { build } = require('./tasks/site')
const posts = require('./tasks/posts')
const pages = require('./tasks/pages')

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
