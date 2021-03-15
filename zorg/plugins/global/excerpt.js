const marked = require('marked')
const EXCERPT_SPLIT_TOKEN = '~~~'

const moreLink = function( item ) {
  const { lang, url } = item.meta

  return ` <a href="${url}" class="button button--light">${ lang === 'en' ? 'read more' : 'lire plus'} -></a>`
}

const getExcerpt = function( item ) {
  const content = item.body.replace( EXCERPT_SPLIT_TOKEN, '')

  if ( !item.body.includes( EXCERPT_SPLIT_TOKEN ) ) return { ...item, content, excerpt: '' }

  const excerpt = marked( item.body.split( EXCERPT_SPLIT_TOKEN )[0] + moreLink( item ) )

  return { ...item, excerpt, content }
}

const addExcerpt = function( contentTypes ) {
  const withExcerpt = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    withExcerpt[type] = contentTypes[type].map( getExcerpt )
  })

  return withExcerpt
}

module.exports = addExcerpt
