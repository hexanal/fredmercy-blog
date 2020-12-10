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

const getPageMetaData = function( item ) {
  const route = item._filePath
    .replace('./content/', '')
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const folder = route[route.length - 2]
  // TODO maybe i18n can be handled via a different middleware
  // TODO maybe "homepageness" can be handled via a middleware, too!!
  const isHome = id === 'home' || folder === 'fr' // TODO figure out the root of the i18n paths (this is not yet done)
  const formattedURL = route.length
    ? route.reduce( (acc, part, index) => {
      return acc + '/' + part
    }, '')
    : '/'
  const url = id === 'home' ? '/' : formattedURL

  return {
    id,
    url,
    route,
    isHome
  }
}

module.exports = addPageMeta
