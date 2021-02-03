require('dotenv').config()

const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
// const errorHandler = require('errorhandler');
const sanitizeHtml = require('sanitize-html');
const lusca = require('lusca');
const expressStatusMonitor = require('express-status-monitor');
const glob = require('glob');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./fredmercy.db');

const app = express();
const { build, watch } = require('./zorg');

/**
 * Setting up Express with all sorts of goodies
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8042);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 1209600000 }
}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
	res.locals.user = req.user;
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

			res.send( rows )
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
});

// app.use(errorHandler())

const server = app.listen(app.get('port'), () => {
	console.log(chalk.blue(`[server] [env: ${app.get('env')}]`));
	console.log(chalk.blue(`[server] [url: http://${app.get('host')}:${app.get('port')} ]`));

	build() // compile the necessary stuff
	if ( app.get('env') === 'development' ) watch() // watch for changes
});

/**
 * BEGIN Websocket business
 */
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
	ws.on('message', function incoming(data) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});

	ws.on('close', function() {
		console.log('close ws connection');
	});
});
/**
 * END Websocket business
 */

module.exports = app;
