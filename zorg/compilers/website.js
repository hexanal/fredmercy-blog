require('dotenv').config() // get those sweet environment settings

const chalk = require('chalk')
const zorg = require('../bin/zorg')
const watcher = require('../bin/watcher')

const plugins = [
  require('../plugins/posts/post-meta'),
  require('../plugins/posts/order'),
  require('../plugins/posts/adjacents'),
  require('../plugins/posts/rss-feed'),
  require('../plugins/pages/page-meta'),
  require('../plugins/pages/relationship'),
  require('../plugins/global/post-index-as-parent'),
  require('../plugins/global/posts-by-months'),
  require('../plugins/global/shortcodes'),
  require('../plugins/global/content'),
  require('../plugins/global/extra-data'),
  require('../plugins/global/settings'),
  require('../plugins/global/sitemap-xml'),
  require('../plugins/global/html'),
]

const build = () => {
  const { time } = zorg( ['en', 'fr'], plugins )

  console.log( chalk.magenta(`[compiler] [website/html] built in ${time} seconds`) )
}

const GLOB = ['./src/content/**/*.(md|js)', './src/**/*.html']

const watch = watcher({
  glob: GLOB,
  type: 'website/html',
  callback: build
})

module.exports = { build, watch }
