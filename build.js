const chalk = require('chalk')
const website = require('./config')
const webpack = require('webpack')
const webpackConfigurator = require('./webpack.config.js')
const bundler = webpack( webpackConfigurator('development') )

website.build()

bundler.run( (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log( chalk.yellow('[webpack] [built assets]') )
})
