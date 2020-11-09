require('dotenv').config()

const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const sanitizeHtml = require('sanitize-html');
const lusca = require('lusca');
const expressStatusMonitor = require('express-status-monitor');
const glob = require('glob');
const WebSocket = require('ws');

const app = express();

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
	const pathToEntry = req.body.entryId.replace('_', '/');
	const filename = `./src/content/entries/${pathToEntry}/${req.body.slot}.json`;
	const entryJSON = JSON.stringify({
		slot: req.body.slot,
		author: sanitizeHtml(req.body.author.substring(0, 100)),
		content: sanitizeHtml(req.body.content.substring(0, 1500))
	});

	new Promise((resolve, reject) => {
		fs.writeFile(filename, entryJSON, 'utf8', (err) => {
			if (err) {
				console.log(chalk.red(`Error while creating comment file: ${err}`));
				reject();
			}

			resolve();
		})
	})
		.then(() => {
			res.send({
				success: true,
				slot: req.body.slot
			});
		})

});

app.get('/api/comments/:entryId', (req, res) => {
	const pathToEntry = req.params.entryId.replace('_', '/');
	const pathToComments = glob.sync(`./src/content/entries/${pathToEntry}/*.json`, {});
	let comments = [];

	Promise.all(
		pathToComments.map( file => {
			return new Promise((resolve, reject) => {
				fs.readFile(file, {encoding: 'utf-8'}, (err, content) => {
					if (err) {
						console.log(chalk.red(`Error while reading comment file: ${err}`));
						reject();
					}

					comments.push(JSON.parse(content));

					resolve();
				});
			});
		})
	)
		.then(() => {
			res.send({
				comments
			});
		});
});

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/files/', express.static(path.join(__dirname, 'files'), { maxAge: 31557600000 }));

/**
 * Catch other routes and serve a 404 ???
 */
app.get('*', (req, res) => {
	res.status(404);
});

app.use(errorHandler());

const server = app.listen(app.get('port'), () => {
	console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
	console.log(chalk.blue(`➤ ENV: ${app.get('env')}`));
	console.log(chalk.blue(`➤ URL: http://${app.get('host')}:${app.get('port')}`));
	console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
});

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

module.exports = app;