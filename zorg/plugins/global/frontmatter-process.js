const marked = require('marked')
const groupBy = require('lodash.groupby')
const orderBy = require('lodash.orderby')

const FULL = '★'
const EMPTY = '☆'
const LOWEST_RATING = 0
const HIGHEST_RATING = 5

const giveStarRating = function( rating ) {
  const stars = new Array(5)
    .fill(EMPTY)
    .map( (_, i) => (i < rating ? FULL : EMPTY) )
    .join('')

  return stars
}

const processRating = function( bookmark ) {
  if (!bookmark.rating) return bookmark

  const split = bookmark.rating.split(',').map( i => i.trim() )
  const parsedRating = parseInt(split[0], 10)

  const ratingGrade = typeof parsedRating === 'number' && (parsedRating >= LOWEST_RATING && parsedRating <= HIGHEST_RATING)
    ? giveStarRating(parsedRating)
    : false

  if ( !ratingGrade ) return { ...bookmark, rating: false } // don't include rating if it's not a number, bro

  const comment = split[1]
    ? ' ' + stripSingleParagraph( marked(split[1]) )
    : ''

  const rating = `${ratingGrade}${comment}`

  return {
    ...bookmark,
    rating
  }
}

const stripSingleParagraph = function( htmlString ) {
  const splitByLines = htmlString.split(/\r\n|\r|\n/)
  const lines = splitByLines.length

  // it's a single-line markdown... strip the <p> tags
  if ( lines === 2 ) return splitByLines[0].replace('<p>', '').replace('</p>', '')

  return htmlString
}

const PROCESSORS = [
  {
    id: 'bookmarks',
    fn: function( item ) {
      const { bookmarks } = item.meta
      const withRating = bookmarks.map( processRating )
      const withOrder = orderBy( withRating, 'title' )
      const withMarkdownTitle = withOrder.map( bookmark => ({...bookmark, title: stripSingleParagraph(marked( bookmark.title )) }) )
      const withTags = groupBy( withMarkdownTitle, 'tag' )

      return withTags
    }
  }
]

const processFrontmatter = function( item ) {
  const processed = PROCESSORS.reduce( (acc, processor) => {
    const { id, fn } = processor
    if ( !item.meta[id] ) return item // no processor needed for this item, don't process

    return {
      ...item,
      meta: {
        ...item.meta,
        [id]: fn( item ) // replace the original frontmatter key with "processed" output :)
      }
    }
  }, item)

  return processed
}

const addProcessedFrontmatter = function( contentTypes ) {
  const withProcessedFrontmatter = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    withProcessedFrontmatter[type] = contentTypes[type].map( processFrontmatter )
  })

  return withProcessedFrontmatter
}

module.exports = addProcessedFrontmatter
