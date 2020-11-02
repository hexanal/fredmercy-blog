const getMonthName = function(number) {
  let month

  switch(number) {
    case '01':
      month = 'january'
      break
    case '02':
      month = 'february'
      break
    case '03':
      month = 'march'
      break
    case '04':
      month = 'april'
      break
    case '05':
      month = 'may'
      break
    case '06':
      month = 'june'
      break
    case '07':
      month = 'july'
      break
    case '08':
      month = 'august'
      break
    case '09':
      month = 'september'
      break
    case '10':
      month = 'october'
      break
    case '11':
      month = 'november'
      break
    case '12':
      month = 'december'
      break
    default:
      month = 'unknown-month'
      break
  }

  return month
}

const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const insertData = function(contentTypes, data) {
  return contentTypes.map( type => addToAllItems(data, type) )
}

const insertDataForContentType = function(contentTypes, typeId, data) {
  return contentTypes.map( type => {
    if ( type.id !== typeId ) return type

    return addToAllItems( data, type)
  })
}

const insertMetaForContentType = function(contentTypes, typeId, metadata) {
  return contentTypes.map( type => {
    if ( type.id !== typeId ) return type

    return {
      ...type,
      items: type.items.map( item => ({
        ...item,
        meta: {
          ...item.meta,
          ...metadata
        }
      }))
    }
  })
}

const addToAllItems = function(data, type) {
  return {
    ...type,
    items: type.items.map( item => ({ ...item, ...data }) )
  }
}

const pipe = fns => x => fns.reduce((v, f) => f(v), x)

const getPageByURL = function( url, pages ) {
  return pages.find( page => page.meta.url === url )
}

module.exports = {
  capitalize,
  getMonthName,
  getPageByURL,
  insertData,
  insertDataForContentType,
  insertMetaForContentType,
  pipe
}
