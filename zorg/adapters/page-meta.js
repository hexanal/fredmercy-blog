const getPageMeta = function( item ) {
  // FIXME: can definitely simplify this
  const route = item._info.src
    .replace(`./src/content/${item.meta.lang}/`, '') // FIXME path in config somewhere
    .replace('.md', '')
    .split('/')
  const id = route[route.length - 1]

  if ( item.meta.isHome ) route.pop()

  const rebuiltUrl = route.length ? route.reduce( (acc, part) => (acc + '/' + part), '') : '/'
  const urlLocalePrefix = item.meta.lang === 'en' ? '' : `/${item.meta.lang}`
  const url = urlLocalePrefix + rebuiltUrl
  const permalink = `https://fredmercy.ca${url}` // FIXME domain name in config

  return {
    ...item.meta,
    id,
    url,
    permalink,
    route
  }
}

module.exports = function( items ) {
  return items.map( item => {
    if ( item.meta.type !== 'page' ) return item

    return {
      ...item,
      meta: getPageMeta(item)
    }
  })
}
