const fse = require('fs-extra')
const chalk = require('chalk')
const glob = require('glob')
const zipper = require('./zorg/zipper')

const comments = glob.sync('./content/blog/**/*.json', {})
const start = Date.now()

const exported = comments.map( commentFile => {
  const filename = commentFile.replace('./content/blog/', './exports/comments/')
  fse.copySync(commentFile, filename)

  return filename
})

const timestamp = Date.now()
const filename = `./exports/comments/comments-export-${timestamp}.tar.gz`
const zipped = zipper(filename, './exports/comments')

const end = Date.now()
const timeDiff = (end - start) / 1000
console.log( chalk.magenta(`[export] [comments and zipped] (in ${timeDiff} seconds)`) )
console.log( chalk.magenta(`[export] [zipped comments] ${zipped}`) )

process.exit()
