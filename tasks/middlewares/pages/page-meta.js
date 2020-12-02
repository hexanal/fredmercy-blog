const applyPageMeta = function( items ) {
  return items.map( item => {
    return {
      ...item,
      meta: {
        ...item.meta,
        ...getPageMetaData(item)
      },
    }
  })
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

module.exports = applyPageMeta
