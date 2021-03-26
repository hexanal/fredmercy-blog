const chokidar = require('chokidar')

module.exports = function({ glob, type, callback }) {
  return () => {
    const watcher = chokidar.watch(glob, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true
    })

    return watcher
      .on('ready', () => console.log( `[fredmercy] watching: ${type}`) )
      .on('change', path => {
        console.log(`~~`)
        console.log( `[fredmercy] "${type}" file changed: ${path}` )
        callback()
      })
  }
}
