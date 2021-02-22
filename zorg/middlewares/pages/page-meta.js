const addPageMeta = function( contentTypes ) {
  return {
    ...contentTypes,
    page: contentTypes.page.map( item => ({
      ...item,
      meta: {
        ...item.meta,
        ...getPageMetaData(item)
      },
    }) )
  }
}

// TODO!!
const LOCALES = ['en', 'fr']

const getPageMetaData = function( item ) {
  const route = item._filePath
    .replace('./content/', '')
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const lang = LOCALES.includes( route[0] )
    ? route[0]    // use the folder as the "lang"
    : LOCALES[0]  // use the default locale

  // TODO maybe i18n can be handled via a different middleware
  // TODO maybe "homepageness" can be handled via a middleware, too!!

  const isHome = id === 'home'
  const formattedURL = route.length
    ? route.reduce( (acc, part) => {
      return acc + '/' + part
    }, '')
    : '/'
  const localeUrl = lang !== LOCALES[0] && lang
  const url = id === 'home'
    ? `/${ localeUrl }`
    : formattedURL
  const permalink = `https://fredmercy.ca${url}` // TODO?

  return {
    id,
    url,
    permalink,
    lang,
    route,
    isHome
  }
}

module.exports = addPageMeta
