const { exec } = require('child_process')

function exportFiles() {
  const timestamp = Date.now()
  const filename = `files-export-${timestamp}.tar.gz`
  const command = `tar -cjvf ${filename} files`

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

}

exportFiles()
