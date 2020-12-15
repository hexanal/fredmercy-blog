const chokidar = require('chokidar')
const chalk = require('chalk')
const webpack = require('webpack');
const webpackConfigurator = require('../webpack.config.js')
const bundler = webpack( webpackConfigurator('development') )

const website = require('../config')

const watchThis = function() {
  const watcher = chokidar.watch([
    './content/**/*.(md|json)',
    './src/**/*.html'
  ], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  /**
   * chokidar is watching (Markdown and JSON content data)
   */
  watcher
    .on('ready', () => console.log( chalk.yellow(`[watch] [content file] watching...`)) )
    .on('change', path => {
      console.log( chalk.yellow(`[watch] [content file] ${path}`) )
      website.build()
    })

  /**
   * webpack is watching (frontend source files)
   */
  bundler.watch({
    aggregateTimeout: 300,
    poll: undefined
  }, (err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    console.log( chalk.yellow('[watch] [source file]') )
  })

}

module.exports = watchThis