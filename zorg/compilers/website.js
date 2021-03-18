require('dotenv').config() // get those sweet environment settings

const chalk = require('chalk')
const zorg = require('../bin/zorg')
const watcher = require('../bin/watcher')
const { websites } = require('../config')

// FIXME: hate the fact that it's... linear
// I want those to be order-agnostic, as much as possible...
const plugins = [
  require('../plugins/posts/post-meta'),
  require('../plugins/posts/order'),
  require('../plugins/posts/adjacents'),
  require('../plugins/posts/rss-feed'),
  require('../plugins/pages/page-meta'),
  require('../plugins/pages/relationship'),
  require('../plugins/global/post-index-as-parent'),
  require('../plugins/global/shortcodes'),
  require('../plugins/global/excerpt'),
  require('../plugins/global/extra-data'),
  require('../plugins/global/settings'),
  require('../plugins/global/sitemap-xml'),
  require('../plugins/global/aliases'),
  // require('../plugins/global/debug'), // TODO
  require('../plugins/global/export-to-json'),
  require('../plugins/global/frontmatter-process'), // TODO rename?
  require('../plugins/global/posts-by-months'),
  require('../plugins/global/html'),
]

const build = () => {
  websites.map( websiteConfig => {
    const { time } = zorg( websiteConfig, plugins )

    console.log( chalk.magenta(`[compiler] [website/html] built "${ websiteConfig.name }" in ${ time } seconds`) )
  })
}

const GLOB = ['./src/content/**/*.(md|js)', './src/theme/**/*.html']

const watch = watcher({
  glob: GLOB,
  type: 'website/html',
  callback: build
})

module.exports = { build, watch }
