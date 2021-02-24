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

const removeLeadingZero = day => {
  if ( day.charAt(0) === '0' ) return day[1]
  return day
}

const getPostMetaData = function( item ) {
  const urlParts = item._filePath // grab special key "_filePath" which contains the path to the markdown file
    .replace(`./src/content/${item.meta.lang}/`, '')
    .replace('.md', '')
    .split('/')
    .reverse()

  const [id, day, month, year, blog] = urlParts

  if ( !day ) return {}

  const dayNoZero = removeLeadingZero( day )
  const date = `${year}-${month}-${day}`

  const monthName = capitalize(getMonthName(month, item.meta.lang))
  const prettyDate = `${monthName} ${dayNoZero}, ${year}`

  const urlLocalePrefix = item.meta.lang === 'en' && item.meta.lang
  const url = `/${urlLocalePrefix}/${blog}/${year}/${month}/${day}/${id}`
  const permalink = `https://fredmercy.ca${url}`
  const archive = `${monthName} ${year}`

  return {
    url,
    permalink,
    date,
    id,
    year,
    month,
    monthName,
    day,
    dayNoZero,
    prettyDate,
    archive
  }
}

const addPostMeta = function( contentTypes ) {
  if ( !contentTypes.post ) return contentTypes // if no blog post yet

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

module.exports = addPostMeta
