const { writeHTML } = require('./files')

const combineData = function( types ) {
  return Object.keys(types).reduce( (acc, typeId) => {
    return {
      ...acc,
      [typeId]: types[typeId].items
    }
  }, {})
}

const applyGlobalData = function( items, global ) {
  return items.map( item => ({ ...item, global }) )
}

const build = function(types) {
  const global = combineData( types )

  Object.keys(types).map( typeId => {
    const { items, applyTemplates } = types[typeId]
    const withGlobal = applyGlobalData( items, global )
    const withTemplate = applyTemplates( withGlobal )

    return withTemplate.map( writeHTML )
  })
}

module.exports = {
  build
}