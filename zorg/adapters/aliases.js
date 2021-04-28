const getAliases = function( items ) {
  const itemsWithAliases = items.filter( item => item.meta.aliases )
  if ( !itemsWithAliases.length ) return []

  return itemsWithAliases.flatMap( item =>
    item.meta.aliases.flatMap( alias => ({
      ...item,
      meta: { ...item.meta, isAlias: true, url: alias }
    }) )
  )
}

const addAliases = function( items ) {
  return [ ...items, ...getAliases( items ) ]
}

module.exports = addAliases
