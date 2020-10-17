const { build } = require('./tasks/site')

const posts = require('./tasks/posts')
const pages = require('./tasks/pages')

build({ posts, pages })
