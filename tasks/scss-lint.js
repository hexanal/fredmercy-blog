var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');
var config = require('../config.js');

module.exports = function() {
	return gulp.src(config.scss.watch)
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError());
}
