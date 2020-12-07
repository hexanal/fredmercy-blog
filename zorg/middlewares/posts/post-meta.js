const { getMonthName, capitalize } = require('../../utils')

const addPostMeta = function( contentTypes ) {
  const withPostMeta = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    if ( type !== 'post' ) withPostMeta[type] = contentTypes[type] // TODO improve this part, I guess

    withPostMeta[type] = contentTypes[type].map( item => {
      return {
        ...item,
        meta: {
          ...item.meta,
          ...getPostMetaData(item)
        }
      }
    })
  })

  return withPostMeta
}

const getPostMetaData = function( item ) {
  const urlParts = item._filePath // grab special key "_filePath" which contains the path to the markdown file
    .replace('./content/blog/', '')
    .replace('.md', '')
    .split('/')

  const year = urlParts[0]
  const month = urlParts[1]
  const day = urlParts[2]
  const id = urlParts[3]
  const date = `${year}-${month}-${day}`

  const monthName = capitalize(getMonthName(month))
  const prettyDate = `${monthName} ${day}, ${year}`

  const url = `/blog/${year}/${month}/${day}/${id}`
  const archive = `${monthName} ${year}`

  return {
    url,
    date,
    id,
    year,
    month,
    day,
    prettyDate,
    archive
  }
}

module.exports = addPostMeta
