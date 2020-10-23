const fs = require('fs')

// TODO make it sturdy, catch errors, etc.
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

const writeHTML = function(destination, htmlTemplate, verbose = false ) {
  // TODO if ( verbose ) console.log(`[writeHTML] creating HTML for content item "${item.meta.title}", at "${item.meta.destination}"`)
  return createDir( destination )
    .then(() => writeFile(destination, htmlTemplate) )
}

module.exports = {
  createDir,
  writeFile,
  writeHTML
}
