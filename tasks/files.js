const fs = require('fs')

const createDir = function(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve(dir)
    })
  })
}

const createHtmlFile = function(dir, html) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}/index.html`, html, (err) => {
      if (err) reject(err)
      resolve({ dir, html })
    })
  })
}

module.exports = {
  createDir,
  createHtmlFile
}
