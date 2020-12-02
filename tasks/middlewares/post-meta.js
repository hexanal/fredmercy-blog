const { getMonthName, capitalize, pipe } = require('../utils')

const applyPostMeta = function( items ) {
  items.map( item => {
    return {
      meta: {
        ...item.meta,
        ...getPostMetaData(item)
      },
      ...item
    }
  })
}

const getPostMetaData = function(entry) {
  const entryUrlParts = entry
    .replace('./src/content/entries', '')
    .replace('.md', '')
    .split('/')
  const date = entryUrlParts[2]
  const id = entryUrlParts[3]
  const url = `/blog/${date}/${id}`
  const destination = `./public/blog/${date}/${id}`
  const [year, month, day] = date.split('-')
  const monthName = capitalize(getMonthName(month))
  const prettyDate = `${monthName} ${day}, ${year}`
  const archive = `${monthName} ${year}`

  return {
    destination,
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

module.exports = applyPostMeta
