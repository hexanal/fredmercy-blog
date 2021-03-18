// const getDebug = function( items ) {
//   if ( !items ) return []

//   const duplicated = items.map( item => ({
//     ...item,
//     meta: {
//       ...item.meta,
//       draft: true,
//       url: `${ item.meta.url }/_debug`,
//       template: 'layouts/debug'
//     }
//   }) )

//   return duplicated
// }

// const addDebug = function( contentTypes ) {
//   const withDebug = {}
//   const types = Object.keys( contentTypes )

//   types.map( type => {
//     const duplicated = getDebug( contentTypes[type] )

//     withDebug[type] = duplicated.concat( contentTypes[type] )
//   })

//   return withDebug
// }

// module.exports = addDebug
