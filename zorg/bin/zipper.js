const { exec } = require('child_process')

function zipper(filename, pathToZip) {
  const command = `tar -cjvf ${filename} ${pathToZip}`

  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`)
          return
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
      }
      console.log(`stdout: ${stdout}`)
  })

  return filename
}

module.exports = zipper
