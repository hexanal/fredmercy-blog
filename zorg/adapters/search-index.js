const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
})

const addItemToSearchIndex = function( item, websiteConfig ) {
  if ( item.meta.type !== 'post' && item.meta.type !== 'page' ) return

  client.index({
    index: websiteConfig.name,
    type: 'page',
    id: item.meta.url,
    body: extractSearchableFields( item ),
  }, function(err, res, status) {
    if (err) {
      console.log(err)
    } else {
      // console.log(`added “${ item.meta.url }” to index`)
    }
  })
}

const extractSearchableFields = function( item ) {
  const { body } = item
  const { title, description, date, tagged, url } = item.meta

  return {
    meta: { title, description, date, tagged, url },
    body
  }
}

const addSearchIndex = function( items, websiteConfig ) {
  client.ping({ requestTimeout: 30000 }, () => {
    client.indices.create({ index: websiteConfig.name }, (err, res, status) => {
      if ( err.status === 400 && res.error.type === 'resource_already_exists_exception' ) {
        return items.map( item => addItemToSearchIndex( item, websiteConfig ) )
      }
      if ( err ) console.log( err )

      return items.map( item => addItemToSearchIndex( item, websiteConfig ) )
    })
  })

  return items
}

module.exports = addSearchIndex
