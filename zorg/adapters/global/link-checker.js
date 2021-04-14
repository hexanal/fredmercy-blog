const regexPattern = /\]\(\/(.*?)\)/gi

const getURLs = function( items ) {
  return items.map( item => item.meta.url )
}

const processLinks = function( matchGroup ) {
  return matchGroup
    .map( match => (`/${match.replace( regexPattern, '$1')}`) ) // add back the slash
    .map( match => {
      const split = match.split('#')
      return split[0]
    })
}

const getLinks = function( items ) {
  const allLinks = items.reduce( (acc, item) => {
    const matchGroup = item.body.match( regexPattern )
    const listOfLinks = matchGroup
      ? processLinks( matchGroup )
      : []

    return acc.concat( listOfLinks )
  }, [])

  return allLinks
}

const addLinkChecker = function( contentTypes, website ) {
  if ( !process.argv.includes('--check-links') ) return contentTypes

  const types = Object.keys( contentTypes )

  const allURLs = types.reduce( (acc, type) => {
    return acc.concat( getURLs( contentTypes[type] ) )
  }, [])
  const allLinks = types.reduce( (acc, type) => {
    return acc.concat( getLinks( contentTypes[type] ) )
  }, [])

  const orphans = allLinks
    .map( link => {
      const isValidInternalLink = allURLs.includes( link )
      if (isValidInternalLink ) return

      console.log(`[fredmercy] possible broken link -> ${ link } (in website: ${ website.name })`)
    })

  return contentTypes
}

module.exports = addLinkChecker
