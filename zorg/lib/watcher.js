const chokidar = require('chokidar')

module.exports = function({ glob, type, callback }) {
  return () => {
    const watcher = chokidar.watch(glob, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true
    })

    return watcher
      .on('ready', () => console.log( `[fredmercy] [watch] ${type}`))
      .on('change', path => {
        console.log(`~~`)
        console.log( `[fredmercy] [watch] ${type} changed: '${path}'` )
        callback()
      })
  }
}
