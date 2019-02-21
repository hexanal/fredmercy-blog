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
				var isoDate = new Date().toISOString().split('T');
				var lastUpdatedOn = isoDate[0];
				var posts = orderBy(entries, 'date', 'desc'); // reorder, and populate our pageData
				var params = {
					pageTitle: config.info.title,
					description: config.info.description,
					entries: posts,
					stats: {
						numberOfEntries: entries.length,
						lastUpdatedOn: lastUpdatedOn
					}
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
					? title + ' __ ' + config.info.title
					: 'Untitled __ ' + config.info.title;
				var comments = typeof pageData.attributes.comments === 'number'
					? pageData.attributes.comments
					: 25;
				var commentsGrid = buildCommentsGrid(post.date, comments);

				var params = {
					url: post.url,
					title: title,
					pageTitle: pageTitle,
					description: pageData.attributes.description || config.info.title,
					date: post.date,
					type: pageData.attributes.type,
					body: marked(pageData.body),
					commentsGrid: commentsGrid
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

function buildCommentsGrid(entryId, comments) {
	if (comments === 0) return;

	return Array(comments).fill(null).map((val, index) => {
		return {
			entryId,
			index: index + 1,
			letterIndex: String.fromCharCode(index + 97),
			commentId: entryId + '_' + (index + 1)
		}
	});
}
