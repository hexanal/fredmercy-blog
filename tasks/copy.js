var gulp = require('gulp');
var config = require('../config.js');

module.exports = function() {
	return gulp.src(config.copy.src)
		.pipe(gulp.dest(config.copy.dest));
}
