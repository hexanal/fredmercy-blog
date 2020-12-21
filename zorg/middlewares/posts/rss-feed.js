const { write } = require('../../helpers/files')

const rssTemplate = items => (`<rss version="2.0">
  <channel>
    <title>Fred Mercy</title>
    <link>https://fredmercy.ca</link>
    <description>A Personal Website</description>

    ${items}

  </channel>
</rss>`)

const buildRSSFeed = function( contentTypes ) {
  const items = contentTypes.post.map( item => {
      const pubDate = new Date( item.meta.date )

      return `
    <item>
      <title>${ item.meta.title }</title>
      <description>${ item.meta.description }</description>
      <link>${ item.meta.permalink }</link>
      <pubDate>${ pubDate }</pubDate>
    </item>
`
  }).join('')

  const rssFeed = rssTemplate( items )
  const destination = `public/`
  const filename = 'rss.xml'

  write(destination, filename, rssFeed) // writing it!

  return contentTypes
}

module.exports = buildRSSFeed
