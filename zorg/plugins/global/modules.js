const getModulesData = function( contentTypes ) {
  if ( !contentTypes.module ) return contentTypes // no module found, return early

  return contentTypes.module.reduce( (acc, item) => ({
    ...acc,
    [item.meta.id]: item.meta.data
  }), {})
}

const addModuleData = function( contentTypes ) {
  const moduleData = getModulesData( contentTypes )
  const withModuleData = {}
  const types = Object.keys( contentTypes )

  // TODO something more functional? getting rid of "withModuleData" ?
  types.map( type => {
    withModuleData[type] = contentTypes[type].map( item => ({ ...item, ...moduleData }) )
  })

  return withModuleData
}

module.exports = addModuleData
