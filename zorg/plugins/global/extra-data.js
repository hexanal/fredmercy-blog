const locales = {
  en: require('../../../src/content/en/_data'),
  fr: require('../../../src/content/fr/_data'),
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
