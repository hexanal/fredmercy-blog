var gulp = require('gulp');
var images = require('gulp-imagemin');
var handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

HandlebarsIntl.registerWith(handlebars); // register helper

var hb = require('gulp-handlebars-html')(handlebars);
var frontMatter = require('front-matter');
var rename = require('gulp-rename');
var through = require('through2');
var config = require('../config');
var orderBy = require('lodash.orderby');

module.exports = {
	copy: function() {
		return gulp.src(config.photos.files)
			.pipe(images())
			.pipe(gulp.dest(config.photos.dest + config.info.photos.path));
	},

	index: function() {
		var photos = [];

		return gulp
			.src(config.photos.src)
			.pipe(through.obj(function (file, enc, cb) {
				var front = frontMatter(file.contents.toString());
				var post = getPostPathAndDate(file);

				photos.push({
					path: post.path,
					title: front.attributes.title,
					date: post.date,
					rawDate: post.date + 'T12:00:00', // otherwise the formatDate thing returns yesterday's date
					description: front.attributes.description
				});

				cb(null);
			}))
			.on('end', function() {
				var params = {
					pageTitle: config.info.photos.title,
					description: config.info.photos.description,
					rootPath: config.info.rootPath,
					photos: orderBy(photos, 'date', 'desc')
				};

				return gulp.src(config.base.src + 'views/templates/photofeed.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.photos.dest + config.info.photos.path));
			});
	}
}

function getPostPathAndDate(file) {
	var pathData = file.relative.slice(0, -3).split('/'); // remove '.md', then split by slash
	// gets you '2019-01-20' and 'file-name-yo', for example

	return {
		date: pathData[0],
		path: config.info.photos.path + '/' + pathData[0] + '/' + pathData[1] + '.jpg'
	};
}
