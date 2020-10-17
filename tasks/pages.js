const fs = require('fs')
const glob = require('glob')
const frontMatter = require('front-matter')
const marked = require('marked')
const { build } = require('./files')

const html = require('./html')

const extractPages = function() {
  const pages = glob.sync('./src/content/pages/**/*.md', {})

  const withContents = applyContent(pages)

  const withRelationships = applyRelationships(withContents)

  const withTemplates = applyTemplates(withRelationships)

  return withTemplates
}

const applyContent = function(pages) {
  return pages.map( page => {
    const file = fs.readFileSync( page, 'utf8' )
    const { attributes, body } = frontMatter( file.toString() )
    const { title, description, template, useJSON } = attributes
    const content = marked(body)
    const jsonData = useJSON ? getJsonData( page ) : null

    const meta = {
      title,
      description,
      template,
      jsonData,
      ...getPageMetaData(page)
    }

    return {
      meta,
      content
    }
  })
}

const getJsonData = function(page) {
  const jsonFilePath = page.replace('.md', '.json')
  const jsonFile = fs.readFileSync( jsonFilePath, 'utf8' )
  const json = JSON.parse( jsonFile )

  return json
}

const applyTemplates = function(pages) {
  html.usePartials('./src/views/components')

  return pages.map(page => {
    const templateFile = fs.readFileSync( `src/views/templates/${ page.meta.template }.html`, 'utf8' )
    const template = html.compile( templateFile.toString() )

    return {
      ...page,
      html: template(page)
    }
  })
}

const getPageMetaData = function(page) {
  const route = page
    .replace('./src/content/pages/', '')
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const folder = route[route.length - 2]

  if (id !== folder) {
    console.log('Hey dude, the page filename should match its parent folder... sorry, it’s just a convention')
  }

  route.pop() // NOTE: disregard the filename for the route

  // TODO why not do the pop before and use join here? because I might want to process the URL some more later?
  const url = route.reduce( (acc, part, index) => {
    return acc + '/' + part
  }, '')

  const destination = `./public${url}`

  return {
    destination,
    id,
    url,
    route
  }
}

const applyRelationships = function( pages ) {
  return pages.map( (page, index) => {
    const children = getChildrenPages( page, index, pages )
    const parents = getParentPages( page, index, pages )

    // TODO can we not mutate here? does it matter?
    page.meta.children = children
    page.meta.parents = parents

    return page
  })
}

const getChildrenPages = function( page, index, pages ) {
  const children = pages.filter( otherPage => {
    const isSameRoute = otherPage.meta.id === page.meta.id
    const isSharedRoute = otherPage.meta.route.includes( page.meta.id )

    return !isSameRoute && isSharedRoute
  })

  return children
}

const getParentPages = function( page, index, pages ) {
  const parents = pages.filter( otherPage => {
    const isSameRoute = otherPage.meta.id === page.meta.id
    const isSharedRoute = page.meta.route.includes( otherPage.meta.id )

    return !isSameRoute && isSharedRoute
  })

  return parents
}

/*
const applyAdjacents = function(entries) {
  return entries.map( (entry, index) => {
    const copy = {...entry}

    copy.meta.previous = entries[ index + 1 ] || null
    copy.meta.next = entries[ index - 1 ] || null

    return copy
  })
}
*/

const pages = extractPages()

module.exports = {
  items: pages,
  applyTemplates
}
