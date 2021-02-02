const { write } = require('../../bin/files')

// TODO write up some logic to set higher priorities, and different "changefreq" values

const sitemapTemplate = urls => (`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${ urls }
</urlset>`)

// <changefreq>monthly</changefreq>
// <priority>0.8</priority>
// <lastmod>${ item.meta.date }</lastmod>

const buildSitemap = function( contentTypes ) {
  const types = Object.keys(contentTypes)
  const urls = types.reduce( (acc, typeId) => {
    const urlsForType = contentTypes[typeId].map( item => (`
  <url>
    <loc>${ item.meta.permalink }</loc>
  </url>`
    ))

    return acc.concat(urlsForType)
  }, []).join('')

  const sitemap = sitemapTemplate( urls )
  const destination = `public/`
  const filename = 'sitemap.xml'

  write(destination, filename, sitemap)

  return contentTypes
}

module.exports = buildSitemap
