const fs = require('fs')

const createDir = function(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve(dir)
    })
  })
}

const writeFile = function(dir, html) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}/index.html`, html, (err) => {
      if (err) reject(err)
      resolve({ dir, html })
    })
  })
}

// FIXME how to handle verbosity here?
const writeHTML = function( item, verbose = false ) {
  // if ( verbose ) console.log(`[writeHTML] creating HTML for content item "${item.meta.title}", at "${item.meta.destination}"`)
  return createDir( item.meta.destination )
    .then( dir => writeFile(dir, item.html) )
}

module.exports = {
  createDir,
  writeFile,
  writeHTML
}
