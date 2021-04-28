require('dotenv').config()

const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const lusca = require('lusca')

const app = express()
const zorg = require('./zorg');
const log = require('./zorg/lib/log');

app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 8042)
app.use( compression() )
app.use( morgan('tiny') )
app.use( express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use((req, res, next) => {
  res.set('Permissions-Policy', 'interest-cohort=()') // floc off!
  res.removeHeader('X-Powered-By') // kind of useless?
  next()
})

app.use('/', express.static(path.join(__dirname, 'public')) )
app.use('/files/', express.static(path.join(__dirname, 'files')) )
app.use('/demos/', express.static(path.join(__dirname, 'demos')) )

app.use(function(req, res) {
  res.status(404)
  res.send( fs.readFileSync('./public/404/index.html', 'utf8') )
});
app.use(function(req, res) {
  res.status(500)
  res.send( fs.readFileSync('./public/500/index.html', 'utf8') )
})

app.listen(app.get('port'), () => {
  console.log(`~~`)
  log(`env: ${app.get('env')}`)
  log(`url: http://${app.get('host')}:${app.get('port')}`)
  console.log(`~~`)

  zorg( app.get('env') )
});

module.exports = app
