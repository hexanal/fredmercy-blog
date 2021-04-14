const getAliases = function( items ) {
  const itemsWithAliases = items.filter( item => item.meta.aliases )
  if ( !itemsWithAliases.length ) return []

  const duplicated = itemsWithAliases.flatMap( item =>
    item.meta.aliases.flatMap( alias => ({
      ...item,
      meta: { ...item.meta, alias: true, url: alias }
    }) )
  )

  return duplicated
}

const addAliases = function( contentTypes ) {
  const withAliases = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    const aliases = getAliases( contentTypes[type] )

    withAliases[type] = aliases.concat( contentTypes[type] )
  })

  return withAliases
}

module.exports = addAliases
