const chokidar = require('chokidar')
const chalk = require('chalk')

module.exports = function({ glob, type, callback }) {
  const watcher = chokidar.watch(glob, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  callback()

  return watcher
    .on('ready', () => console.log( chalk.yellow(`[watch] [${type}]`)) )
    .on('change', path => {
      console.log( chalk.yellow(`[watch] [${type}] ${path}`) )
      callback()
    })
}
