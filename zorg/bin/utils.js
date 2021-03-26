const debugLog = msg => {
  if ( process.argv.includes('--verbose') ) console.log( `[fredmercy] debug: "${msg}"`)
}

const extractBasicMeta = items => {
  return items.map( item => {
    const { title, url, description } = item.meta

    return {
      meta: {
        title,
        url,
        description
      }
    }
  })
}

const getFilenameFromPath = function( filepath ) {
  const route = filepath
    .replace('./content/', '')
    .split('/')
  const filename = route[route.length - 1]

  return filename
}

const getFormattedTimestamp = function( timestamp ) {
  const date = new Date( timestamp )

  const day = withLeadingZero( date.getUTCDate() + 1 ) // these are indexes...
  const month = withLeadingZero( date.getUTCMonth() + 1 ) // these are indexes...
  const year = date.getUTCFullYear()

  const time = getAmPmTime( date )

  return `${month}-${day}-${year} @ ${time}`
}

const getItemByURL = function(items, url) {
  return items.find( item => item.meta.url === url )
}
const getItemsByURL = function(items, urls) {
  return items.filter( item => urls.includes(item.meta.url) )
}

const insertData = function(items, data) {
  return items.map( item => ({ ...item, ...data }) )
}

const insertDataByURL = (items, data, url) => {
  return items.map( item => {
    if ( item.meta.url !== url ) return item

    return {
      ...item,
      ...data
    }
  })
}

const insertMeta = function(items, insertedMeta) { return items.map( item => ({
    ...item,
    meta: {
      ...item.meta,
      ...insertedMeta
    }
  }))
}

const pipe = fns => x => fns.reduce((v, f) => f(v), x)

// TODO merge codebases/!?!? to share client/server utils?!
const withLeadingZero = number => {
  const n = number.toString()

  return n.length < 2 // single digit number
    ? '0' + n
    : n
}

const getAmPmTime = date => {
  const originalHours = date.getHours()
  const hoursIn12format = originalHours > 12 ? originalHours - 12 : originalHours

  const hours = hoursIn12format === 0 ? 12 : hoursIn12format
  const minutes = withLeadingZero( date.getMinutes() )
  const suffix = originalHours >= 12 ? 'pm' : 'am'

  return `${hours}:${minutes}${suffix}`
}

module.exports = {
  debugLog,
  extractBasicMeta,
  getFilenameFromPath,
  getFormattedTimestamp,
  getItemByURL,
  getItemsByURL,
  insertData,
  insertDataByURL,
  insertMeta,
  pipe
}
