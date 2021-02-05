const { insertDataByURL } = require('../../bin/utils')
const groupBy = require('lodash.groupby')

const addPostsByMonth = function(contentTypes) {
  const postsByMonth = groupBy(contentTypes.post, 'meta.archive')

  return {
    ...contentTypes,
    page: insertDataByURL(contentTypes.page, { postsByMonth }, '/blog')
  }
}

module.exports = addPostsByMonth
