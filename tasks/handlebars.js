var gulp = require('gulp');
var handlebars = require('handlebars');
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
					description: front.attributes.description,
				});

				cb(null);
			}))
			.on('end', function() {
				var posts = orderBy(entries, 'date', 'desc'); // reorder, and populate our pageData
				var params = {
					title: 'Fred Mercy Blog',
					description: 'A collection of thoughts, I suppose',
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

				var params = {
					url: post.url,
					title: pageData.attributes.title,
					description: pageData.attributes.description,
					date: post.date,
					body: marked(pageData.body)
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
