require('dotenv').config() // get those sweet environment settings

const zorg = require('../lib/zorg')
const watcher = require('../lib/watcher')
const { websites, adapters } = require('../config')

const build = () => {
  websites.map( websiteConfig => {
    const { time } = zorg( websiteConfig, adapters )
    console.log( `[fredmercy] [html] ${ websiteConfig.name } ~~ ${ time }ms` )
  })
}

const GLOB = ['./src/content/**/*.(md|js)', './src/theme/**/*.html']

const watch = watcher({
  glob: GLOB,
  type: 'html',
  callback: build
})

module.exports = { build, watch }
