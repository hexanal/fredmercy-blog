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
  const route = item._info.src
    .replace(`./src/content/${item.meta.lang}/`, '') // FIXME path in config somewhere
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]
  const isHome = item.meta.isHome

  if (isHome) route.pop()

  const rebuiltUrl = route.length ? route.reduce( (acc, part) => (acc + '/' + part), '') : '/'
  const urlLocalePrefix = item.meta.lang === 'en' ? '' : `/${item.meta.lang}`
  const url = urlLocalePrefix + rebuiltUrl
  const permalink = `https://fredmercy.ca${url}` // FIXME domain name in config

  const meta = {
    ...item.meta,
    id,
    url,
    permalink,
    route,
    isHome
  }

  return meta
}

module.exports = addPageMeta
