const getMonthName = function(number, lang) {
  const months = {
    '01': { en: 'january', fr: 'janvier' },
    '02': { en: 'february', fr: 'février', },
    '03': { en: 'march', fr: 'mars', },
    '04': { en: 'april', fr: 'avril' },
    '05': { en: 'may', fr: 'mai' },
    '06': { en: 'june', fr: 'juin' },
    '07': { en: 'july', fr: 'juillet' },
    '08': { en: 'august', fr: 'août' },
    '09': { en: 'september', fr: 'septembre' },
    '10': { en: 'october', fr: 'octobre' },
    '11': { en: 'november', fr: 'novembre' },
    '12': { en: 'december', fr: 'décembre' },
  }

  return months[number][lang]
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

  const monthName = getMonthName(month, item.meta.lang)
  const prettyDate = `${monthName} ${dayNoZero}, ${year}`

  const urlLocalePrefix = item.meta.lang === 'en' ? '/' : `/${item.meta.lang}/`
  const url = `${urlLocalePrefix}${blog}/${year}/${month}/${day}/${id}`
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