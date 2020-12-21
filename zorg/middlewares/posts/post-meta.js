const getMonthName = function(number) {
  const months = {
    '01': 'january',
    '02': 'february',
    '03': 'march',
    '04': 'april',
    '05': 'may',
    '06': 'june',
    '07': 'july',
    '08': 'august',
    '09': 'september',
    '10': 'october',
    '11': 'november',
    '12': 'december',
  }

  return months[number]
}

const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const addPostMeta = function( contentTypes ) {
  return {
    ...contentTypes,
    post: contentTypes.post.map( item => ({
      ...item,
      meta: {
        ...item.meta,
        ...getPostMetaData(item)
      }
    }) )
  }
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
  const permalink = `https://fredmercy.ca${url}` // TODO?
  const archive = `${monthName} ${year}`

  return {
    url,
    permalink,
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
