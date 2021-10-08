module.exports = (msg, critical = false) => {
  if (process.argv.includes('-verbose=1') || critical) {
    console.log(`\x1b[7m[${process.env.npm_package_name}]\x1b[0m ✷  ${msg}`)
  }
}