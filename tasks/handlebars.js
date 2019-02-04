var gulp = require('gulp');
var handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

HandlebarsIntl.registerWith(handlebars); // register helper

var hb = require('gulp-handlebars-html')(handlebars);
var frontMatter = require('front-matter');
var marked = require('marked');
var rename = require('gulp-rename');
var through = require('through2');
var config = require('../config');
var orderBy = require('lodash.orderby');

module.exports = {
	index: function() {
		var entries = [];

		return gulp
			.src(config.html.src)
			.pipe(through.obj(function (file, enc, cb) {
				var front = frontMatter(file.contents.toString());
				var post = getPostPathAndDate(file);

				entries.push({
					url: post.url,
					title: front.attributes.title,
					date: post.date,
					rawDate: post.date + 'T12:00:00', // otherwise the formatDate thing returns yesterday's date
					description: front.attributes.description,
					type: front.attributes.type
				});

				cb(null);
			}))
			.on('end', function() {
				var posts = orderBy(entries, 'date', 'desc'); // reorder, and populate our pageData
				var params = {
					pageTitle: config.info.title,
					description: config.info.description,
					entries: posts
				};

				return gulp.src(config.html.templates + 'index.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.html.dest));
			});
	},

	posts: function() {
		return gulp
			.src(config.html.src)
			.pipe(through.obj(function (file, enc, cb) {
				var pageData = frontMatter(file.contents.toString());
				var template = typeof pageData.attributes.template === 'string'
					? pageData.attributes.template
					: 'post'; // default to post template type
				var post = getPostPathAndDate(file);

				marked.setOptions({
					gfm: true,
					breaks: true
				});

				var title = pageData.attributes.title || '';
				var pageTitle = pageData.attributes.title
					? title + '——' + config.info.title
					// : 'Untitled Entry——' + config.info.title;
					: '𝘜𝘯𝘵𝘪𝘵𝘭𝘦𝘥 Entry——' + config.info.title;

				var params = {
					url: post.url,
					title: title,
					pageTitle: pageTitle,
					description: pageData.attributes.description || config.info.title,
					date: post.date,
					type: pageData.attributes.type,
					body: marked(pageData.body),
					commentsGrid: buildCommentsGrid(post.date)
				};

				return gulp.src(config.html.templates + template + '.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest( config.html.dest + post.url))
					.on('error', cb)
					.on('end', cb);
			}));
	}
}

function getPostPathAndDate(file) {
	var pathData = file.relative.slice(0, -3).split('/'); // remove '.md', then split by slash
	// gets you '2019-01-20' and 'file-name-yo', for example

	return {
		url: pathData[0] + '/' + pathData[1],
		date: pathData[0],
		path: pathData[1]
	};
}

function buildCommentsGrid(entryId) {
	return Array(25).fill(null).map((val, index) => {
		return {
			index,
			letterIndex: String.fromCharCode(index + 97),
			entryId,
			commentId: '_' + entryId + '_' + String.fromCharCode(index + 97)
		}
	});
}
