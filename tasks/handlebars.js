var gulp = require('gulp');
var handlebars = require('handlebars');
var hb = require('gulp-handlebars-html')(handlebars);
var rename = require('gulp-rename');
var through = require('through2');
var config = require('../config');

module.exports = function() {
	return gulp
		.src(config.html.src)
		.pipe(through.obj(function (file, enc, cb) {
			var pageData = JSON.parse(file.contents.toString());

			return gulp.src(config.html.srcViews + 'pages/' + pageData.config.template + '.html')
				.pipe(hb(pageData, {
					allowedExtensions: ['html', 'hbs'],
					partialsDirectory: [
						config.html.srcViews + 'components',
					],
				}))
				.pipe(rename('index.html'))
				.pipe(gulp.dest( config.html.dest + pageData.config.path))
				.on('error', cb)
				.on('end', cb);
		}));
}