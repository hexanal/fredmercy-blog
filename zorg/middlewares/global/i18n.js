
const addI18nMeta = function( contentTypes ) {
  return {
    ...contentTypes,
    page: contentTypes.page.map( item => ({
      ...item,
      meta: {
        ...item.meta,
        ...getI18nMeta(item)
      },
    }) )
  }
}

const getI18nMeta = function( item ) {
  // TODO return properly formatted stuff

  return {
  }
}

module.exports = addI18nMeta
