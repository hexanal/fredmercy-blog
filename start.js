const { createDir, createHtmlFile } = require('./tasks/files')
const { posts } = require('./tasks/posts')

posts.map( post => {
  console.log( post.meta )
})

// posts.map( post => {
//   createDir( post.meta.destination )
//     .then( dir => createHtmlFile(dir, post.html) )
// })
