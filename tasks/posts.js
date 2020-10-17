const fs = require('fs')
const glob = require('glob')
const frontMatter = require('front-matter')
const marked = require('marked')
const orderBy = require('lodash.orderby')
const { build } = require('./files')

const html = require('./html')

// TODO figure out if a "middleware" or "plugin" thing could work here?
// if I use a gulp-like "pipe"?
const extractPosts = function() {
  const entries = glob.sync('./src/content/entries/**/*.md', {})

  const withContents = applyContent(entries)

  const withOrder = orderBy(withContents, 'meta.date', 'desc')

  const withAdjacentPosts = applyAdjacents(withOrder)

  const withTemplates = applyTemplates(withAdjacentPosts)

  return withTemplates
}

const applyContent = function(entries) {
  return entries.map( entry => {
    const file = fs.readFileSync( entry, 'utf8' )
    const { attributes, body } = frontMatter( file.toString() )
    const { title, description, type } = attributes
    const content = marked(body)

    const meta = {
      title,
      description,
      type,
      ...getPostMetaData(entry)
    }

    return {
      meta,
      content
    }
  })
}

const applyTemplates = function(entries) {
  html.usePartials('./src/views/components')

  const templateFile = fs.readFileSync( 'src/views/templates/post.html', 'utf8' )
  const template = html.compile( templateFile.toString() )

  return entries.map(entry => {
    return {
      ...entry,
      html: template(entry)
    }
  })
}

const getPostMetaData = function(entry) {
  const entryUrlParts = entry
    .replace('./src/content/entries', '')
    .replace('.md', '')
    .split('/')
  const date = entryUrlParts[2]
  const id = entryUrlParts[3]
  const url = `/blog/${date}/${id}`
  const destination = `./public/blog/${date}/${id}`
  const [year, month, day] = date.split('-')

  return {
    destination,
    url,
    date,
    id,
    year,
    month,
    day
  }
}

const applyAdjacents = function(entries) {
  return entries.map( (entry, index) => {
    const copy = {...entry}

    copy.meta.previous = entries[ index + 1 ] || null
    copy.meta.next = entries[ index - 1 ] || null

    return copy
  })
}

const posts = extractPosts()

module.exports = {
  items: posts,
  applyTemplates
}
