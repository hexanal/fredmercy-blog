const chokidar = require('chokidar')
const website = require('./build')

const watcher = chokidar.watch([
  './content/**/*.(md|json)',
  './src/**/*.html'
], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})

watcher
  .on('ready', () => console.log(`[watch] building the website, and watching for changes in content and source files`))
  .on('change', path => {
    console.log(`[watch] [change] ${path}`)
    website.build()
  })
