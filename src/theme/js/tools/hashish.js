export const getHashes = function() {
  return window.location.hash
    .substr(1) // remove #
    .split('(~') // remove opening parens
    .filter( hashPart => hashPart !== '' )
    .map( hashPart => hashPart.slice(0, -1) ) // remove closing parens
    .map( hashPart => {
      const [type, value] = hashPart.split(':')
      return { type, value }
    })
}

export const getHash = function( hashType ) {
  const match = getHashes().find( hash => hash.type === hashType )

  if (!match) return false

  return match.value
}

// export default function({ messaging }) {
//   const state = {
//     hashes: []
//   }

//   window.addEventListener('hashchange', onHashChange, false)


//   const onHashChange = e => {
//     state.hashes = getHashes()
//     // console.log( e )
//     // console.log( window.location.hash )
//   }

//   main()
//   // onReef( function() { })
//   // state.active.changed( active => { })
//   // messaging.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

//   // return function() {
//     // messaging.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
//   // }
// }
