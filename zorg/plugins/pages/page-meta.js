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
    .replace(`./src/content/${item.meta.lang}/`, '')
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const isHome = item.meta.isHome

  if (isHome) route.pop()

  const rebuiltUrl = route.length ? route.reduce( (acc, part) => (acc + '/' + part), '') : '/'
  const urlLocalePrefix = item.meta.lang === 'en' ? '' : `/${item.meta.lang}`
  const url = urlLocalePrefix + rebuiltUrl
  const permalink = `https://fredmercy.ca${url}`

  return {
    id,
    url,
    permalink,
    route,
    isHome
  }
}

module.exports = addPageMeta
