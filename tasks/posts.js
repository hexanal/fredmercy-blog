const fs = require('fs')
const glob = require('glob')
const frontMatter = require('front-matter')
const marked = require('marked')
const orderBy = require('lodash.orderby')

const html = require('./html')
const { getMonthName, capitalize, pipe } = require('./utils')

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
  html.usePartials('./src/components')

  const templateFile = fs.readFileSync( 'src/templates/posts.html', 'utf8' )
  const template = html.compile( templateFile.toString() )

  return entries.map(entry => {
    const htmlTemplate = template(entry)

    html.render(entry.meta.destination, htmlTemplate)
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
  const archive = `${capitalize(getMonthName(month))} ${year}`

  return {
    destination,
    url,
    date,
    id,
    year,
    month,
    day,
    archive
  }
}

const applyComments = function(entries) {
  return entries.map( entry => {
    const entryId = entry.meta.date

    return {
      ...entry,
      comments: Array(25).fill(null).map((_, index) => ({
        entryId,
        index: index + 1,
        commentId: entryId + '_' + (index + 1)
      }))
    }
  })
}

const applyAdjacents = function(entries) {
  return entries.map( (entry, index) => {
    const copy = {...entry}

    copy.meta.previous = entries[ index + 1 ] || null
    copy.meta.next = entries[ index - 1 ] || null

    return copy
  })
}

const applyOrder = function( entries ) {
  return orderBy(entries, 'meta.date', 'desc')
}

const extractPosts = function() {
  const entries = glob.sync('./src/content/entries/**/*.md', {})

  return pipe([
    applyContent,
    applyComments,
    applyOrder,
    applyAdjacents
  ])(entries);
}

const posts = extractPosts()

// TODO make sure this is sturdy?
module.exports = {
  id: 'posts',
  items: posts,
  renderer: items => applyTemplates(items)
}
