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
  const isHome = item.meta.isHome

  if (isHome) route.pop()

  const url = route.length
    ? route.reduce( (acc, part) => {
      return acc + '/' + part
    }, '')
    : '/'
  // const url = isHome ? `/` : formattedURL
  const permalink = `https://fredmercy.ca${url}`

  console.log( url )

  return {
    id,
    url,
    permalink,
    route,
    isHome
  }
}

module.exports = addPageMeta
