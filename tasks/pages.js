const fs = require('fs')
const glob = require('glob')
const frontMatter = require('front-matter')
const marked = require('marked')
const jsyaml = require('js-yaml')

const html = require('./html')
const { pipe } = require('./utils')

/**
 * TODO create default page object so that we know what shape that object is gonna be
 * - I'd rather not use TypeScript
 * - let it be sort of loose to start with
 */

const applyContent = function(pages) {
  return pages.map( page => {
    const file = fs.readFileSync( page, 'utf8' )
    const { attributes, body } = frontMatter( file.toString() )
    const { title, description, template, useJSON } = attributes
    const content = marked( experiment(body) )
    // TODO maybe try to implement the thing about middlewares for augmenting the page
    // like `use: json | location | whatever`
    // to indicate that the page needs to have access to this type of data
    const json = useJSON ? getJsonData( page ) : null

    const meta = {
      title,
      description,
      template,
      ...getPageMetaData(page)
    }

    return {
      meta,
      json,
      content
    }
  })
}

/**
 * this extracts the components with their yaml data
 */
const experiment = function( body ) {
  const blocks = body.match(/[^\[\[]+(?=\]\])/g)

  if (!blocks) return body

  html.usePartials('./src/components')

  const components = blocks.map(block => {
    const split = block.split('\n')
    const component = `{{>${split[0]} data }}`;
    const yaml = split.join('\n').replace(split[0], '')
    const template = html.compile( component )
    const templateWithData = template({ data: jsyaml.load(yaml) })

    return templateWithData
  })

  const bodyWithComponents = blocks.reduce( (acc, blockString, index) => {
    return acc.replace(`[[${blockString}]]`, components[index] )
  }, body)

  return bodyWithComponents
}

const getJsonData = function(page) {
  const jsonFilePath = page.replace('.md', '.json')
  const jsonFile = fs.readFileSync( jsonFilePath, 'utf8' )
  const json = JSON.parse( jsonFile )

  return json
}

const applyTemplates = function(pages) {
  html.usePartials('./src/components')

  return pages.map(page => {
    const templateFile = fs.readFileSync( `src/templates/${ page.meta.template }.html`, 'utf8' )
    const template = html.compile( templateFile.toString() )
    const htmlTemplate = template(page)

    html.render(page.meta.destination, htmlTemplate)
  })
}

const getPageMetaData = function(page) {
  const route = page
    .replace('./src/content/pages/', '')
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const folder = route[route.length - 2] || 'home' // if there's no folder, it's the homepage (a.k.a. root)
  const isHome = folder === 'home' || folder === 'fr' // TODO figure out the root of the i18n paths (this is not yet done)

  if (id !== folder) {
    console.log('Hey dude, the page filename should match its parent folder... sorry, it’s just a convention')
  }
  route.pop() // NOTE: disregard the filename for the route

  // TODO why not do the pop before and use join here? because I might want to process the URL some more later?
  const url = route.length
    ? route.reduce( (acc, part, index) => {
      return acc + '/' + part
    }, '')
    : '/'

  const destination = `./public${url}`

  return {
    destination,
    id,
    url,
    route,
    isHome
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
  if (page.meta.id === 'home') return []; // don't bother finding children for home: it has them all anyway

  const children = pages.filter( candidatePage => {
    const isSameRoute = candidatePage.meta.id === page.meta.id
    const isPartOfRoute = candidatePage.meta.url.includes( page.meta.url )
    if (isSameRoute || !isPartOfRoute) return false

    return candidatePage.meta.url.replace( page.meta.url, '') // will be falsy if it leaves "leftover" routes
  })

  return children
}

const getParentPages = function( page, index, pages ) {
  if (page.meta.id === 'home') return []; // don't bother finding parents for home: it has none

  const parents = pages.filter( possibleParentPage => {
    if (possibleParentPage.meta.id === 'home') return false // nope
    const isSameRoute = possibleParentPage.meta.id === page.meta.id
    const isSharedRoute = page.meta.url.includes( possibleParentPage.meta.url )

    return !isSameRoute && isSharedRoute
  })

  return parents
}

/*
 * TODO: get "siblings" pages

const applyAdjacents = function(entries) {
  return entries.map( (entry, index) => {
    const copy = {...entry}

    copy.meta.previous = entries[ index + 1 ] || null
    copy.meta.next = entries[ index - 1 ] || null

    return copy
  })
}
*/

const extractPages = function() {
  const pages = [
    './src/content/pages/home.md',
    ...glob.sync('./src/content/pages/**/*.md', {})
  ]

  return pipe([
    applyContent,
    applyRelationships
  ])( pages );
}

/**
 * WORK IN PROGRESS
 * A content type exports an object with three things:
 *
 * 1. the `id` of the conten type
 * 2. the `items`, which is an array of items, and each item is an object containing data for that page -> I have to define the schema for this object
 * 3. the `renderer', which is a function that uses whatever templating engine you want and feeds the HTML to the `html.render` function (from my `html` library!)
 */
module.exports = () => ({
  id: 'pages',
  items: extractPages(),
  renderer: items => applyTemplates(items)
})
