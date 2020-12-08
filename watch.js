const chokidar = require('chokidar')
const webpack = require('webpack');
const webpackConfigurator = require('./webpack.config.js')
const bundler = webpack( webpackConfigurator('development') )

const website = require('./build')

const watcher = chokidar.watch([
  './content/**/*.(md|json)',
  './src/**/*.html'
], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})

bundler.watch({
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('[watch] [source changed] webpack has done it again!')
  console.log('———————')
})

watcher
  .on('ready', () => console.log(`[watch] building the website, and watching for changes in content and source files`))
  .on('change', path => {
    console.log(`[watch] [content changed] ${path}`)
    website.build()
  })
