export const getHashes = function() {
  return window.location.hash
    .replace('~~', '')
    .substr(1) // remove #
    .split('(~') // remove opening parens
    .filter( hashPart => hashPart !== '' )
    .map( hashPart => hashPart.slice(0, -1) ) // remove closing parens
    .map( hashPart => {
      const [type, value] = hashPart.split(':')
      return { type, value }
    })
}

export const setHash = function( hashType, value ) {
  const currentHashes = getHashes()
  const plucked = currentHashes.map( hash => hash.type )
  const hashExists = plucked.includes( hashType )

  const nextHashes = hashExists
    ? currentHashes.map( hash => (hash.type !== hashType) ? hash : {...hash, value }).filter( hash => hash.value !== false )
    : [...currentHashes, { type: hashType, value }]

  const formattedHash = formatHashes( nextHashes )

  window.location.hash = formattedHash
}

export const getHash = function( hashType ) {
  const match = getHashes().find( hash => hash.type === hashType )

  if (!match) return false

  return match
}

const formatHashes = function(hashes) {
  return hashes.reduce( (acc, hash) => {
    if ( hash.value === false ) return acc

    return `${acc}(~${hash.type}${typeof hash.value === 'string' ? ':' + hash.value : ''})` // !!!
  }, '#')
}
