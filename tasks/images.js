var gulp = require('gulp');
var images = require('gulp-imagemin');
var config = require('../config.js');

module.exports = function() {
	return gulp.src(config.images.src)
		.pipe(images())
		.pipe(gulp.dest(config.images.dest));
}
