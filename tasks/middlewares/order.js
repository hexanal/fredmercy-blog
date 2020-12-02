const orderBy = require('lodash.orderby')

module.exports = function( items ) {
  return orderBy(items, 'meta.date', 'desc')
}
