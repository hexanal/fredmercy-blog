const { build } = require('./tasks/site')

const typePosts = require('./tasks/posts')
const typePages = require('./tasks/pages')

build([
  {
    type: 'posts',
    items: typePosts.items,
    renderer: typePosts.build
  },
  {
    type: 'pages',
    items: typePages.items,
    renderer: typePages.build
  }
])
