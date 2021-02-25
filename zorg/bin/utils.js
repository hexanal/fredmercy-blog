const chalk = require('chalk')

const debugLog = msg => {
  if ( process.argv.includes('--verbose') ) console.log( chalk.green(`[debug] ${msg}`) )
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

module.exports = {
  debugLog,
  extractBasicMeta,
  getFilenameFromPath,
  getItemByURL,
  getItemsByURL,
  insertData,
  insertDataByURL,
  insertMeta,
  pipe
}
