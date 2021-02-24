const requireLocale = locale => {
  return {
    t: require(`../../../src/content/${locale}/_data/locales`),
    nav: require(`../../../src/content/${locale}/_data/nav`),
    themes: require(`../../../src/content/${locale}/_data/themes`),
  }
}

const locales = {
  en: requireLocale('en'),
  fr: requireLocale('fr'),
}

const addExtraData = function( contentTypes ) {
  const withExtraData = {}
  const types = Object.keys( contentTypes )

  // TODO could use a cool reduce func here but... meh
  types.map( type => {
    withExtraData[type] = contentTypes[type].map( item => {
      const extraData = locales[item.meta.lang]

      return { ...item, ...extraData }
    })
  })

  return withExtraData
}

module.exports = addExtraData
