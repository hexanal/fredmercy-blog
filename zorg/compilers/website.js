require('dotenv').config() // get those sweet environment settings

const chalk = require('chalk')
const zorg = require('../bin/zorg')
const watcher = require('../bin/watcher')

const middlewares = [
  require('../middlewares/posts/post-meta'),
  require('../middlewares/posts/order'),
  require('../middlewares/posts/adjacents'),
  require('../middlewares/posts/rss-feed'),
  require('../middlewares/pages/page-meta'),
  require('../middlewares/pages/relationship'),
  require('../middlewares/global/post-index-as-parent'),
  require('../middlewares/global/posts-by-months'),
  require('../middlewares/global/shortcodes'),
  require('../middlewares/global/content'),
  require('../middlewares/global/extra-data'),
  require('../middlewares/global/settings'),
  require('../middlewares/global/sitemap-xml'),
  require('../middlewares/global/html'),
]

const build = () => {
  const { timeDiff } = zorg( middlewares )

  console.log( chalk.magenta(`[compiler] [website/html] built in ${timeDiff} seconds`) )
}

const watch = watcher({
  glob: ['./content/**/*.(md|json)', './src/**/*.html'],
  type: 'website/html',
  callback: build
})

module.exports = { build, watch }
