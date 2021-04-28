require('dotenv').config()

const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const marked = require('marked');
const morgan = require('morgan');
const sanitizeHtml = require('sanitize-html');
const lusca = require('lusca');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./fredmercy.db');

const app = express();
const zorg = require('./zorg');
const log = require('./zorg/lib/log');

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 8042);
app.use( compression() )
app.use( morgan('tiny') )
app.use( express.json());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  res.set('Permissions-Policy', 'interest-cohort=()') // floc off!
  res.removeHeader('X-Powered-By') // kind of useless?
  next();
});

app.post('/api/comment', (req, res) => {
  db.run(`INSERT INTO comments (timestamp, url, author, comment) VALUES(?, ?, ?, ?)`, [
    req.body.timestamp,
    req.body.url,
    sanitizeHtml(req.body.author.substring(0, 100)),
    sanitizeHtml( req.body.comment.substring(0, 1500) )
  ], (error, rows) => {
    if ( error ) res.send( error )

    res.send({ success: true })
  })
});

app.post('/api/comments/byUrl', (req, res) => {
  const { url } = req.body

  db.all(
    `SELECT * FROM comments WHERE url="${url}" ORDER BY timestamp ASC`,
    {},
    (error, rows) => {
      if ( error ) res.send( error )

      const formatted = rows.map( row => ({ ...row, comment: marked(row.comment) }) )

      res.send( formatted )
  })
})

app.use('/', express.static(path.join(__dirname, 'public')) );
app.use('/files/', express.static(path.join(__dirname, 'files')) );
app.use('/demos/', express.static(path.join(__dirname, 'demos')) );

app.use(function(req, res) {
  const html = fs.readFileSync('./public/404/index.html', 'utf8')

  res.status(404)
  res.send(html)
});
app.use(function(error, req, res, next) {
  const html = fs.readFileSync('./public/500/index.html', 'utf8')

  res.status(500)
  res.send(html)
})

app.listen(app.get('port'), () => {
  console.log(`~~`)
  log(`env: ${app.get('env')}`)
  log(`url: http://${app.get('host')}:${app.get('port')}`)
  console.log(`~~`)

  zorg( app.get('env') )
});

module.exports = app
