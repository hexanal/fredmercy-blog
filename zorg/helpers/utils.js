

const insertMeta = function(items, insertedMeta) {
  return items.map( item => ({
    ...item,
    meta: {
      ...item.meta,
      ...insertedMeta
    }
  }))
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

const pipe = fns => x => fns.reduce((v, f) => f(v), x)

const getItemByURL = function(items, url) {
  return items.find( item => item.meta.url === url )
}

module.exports = {
  getItemByURL,
  insertData,
  insertDataByURL,
  insertMeta,
  pipe
}
