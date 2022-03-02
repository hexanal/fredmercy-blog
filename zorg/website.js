const zorg = require('./lib/zorg')
const log = require('./lib/log')
const watcher = require('./lib/watcher')

// `websites` lists the configuration for different content directories
const websites = [
  {
    baseURL: '/',
    baseDomain: 'https://fredmercy.ca',
    locale: 'en',
    name: 'fredmercy.ca/',
    contentSrc: './src/content/en/**/*.md', // FIXME maybe `contentDir: 'src/content/en'` and we add the rest in `zorg`?
    contentDir: 'src/content/en/' // with trailing slash
  },
  {
    baseURL: '/fr',
    baseDomain: 'https://fredmercy.ca',
    locale: 'fr',
    name: 'fredmercy.ca/fr',
    contentSrc: './src/content/fr/**/*.md',
    contentDir: 'src/content/fr/' // with trailing slash
  }
]

// Adapters are functions that go through the content to "process" it
const adapters = [
  // FIXME: order matters here; should it? can we get around it?
  // TODO: split adapters by type? how? blah blah, add specific adapters from meta data?
  // adapters are "per chunk", and may apply to anything upstream in the chunk hierarchy
  // page chunk adds a few things
  // post chunk adds whatever
  // specific post index list page uses the `post-index-as-parent` adapter

  require('./adapters/default-meta'),
  require('./adapters/published'),

  // for posts
  require('./adapters/post-meta'),
  require('./adapters/order'),
  require('./adapters/adjacents'),
  require('./adapters/rss-feed'),

  // for pages
  require('./adapters/page-meta'),
  require('./adapters/relationship'),

  // for any type
  require('./adapters/post-index-as-parent'),
  require('./adapters/shortcodes'),
  require('./adapters/modules'),
  require('./adapters/markdown'),
  require('./adapters/aliases'),
  require('./adapters/posts-by-months'),
  require('./adapters/sitemap-xml'),
  require('./adapters/link-checker'),

  // output to JSON
  require('./adapters/export-to-json'),

  // output to HTML
  require('./adapters/html'),
]

const build = () => {
  return websites.map( websiteConfig => {
    const { time } = zorg( websiteConfig, adapters )
    log( `html: ${ websiteConfig.name } ~~ ${ time }ms` )
    return time
  })
}

const GLOB = ['./src/content/**/*.(md|js)', './src/theme/**/*.html']

const watch = watcher({
  glob: GLOB,
  type: 'html',
  callback: build
})

module.exports = { build, watch }
