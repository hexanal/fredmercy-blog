var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config.js');

module.exports = function() {
	gulp.watch(config.browsersync.watch)
		.on('change', browserSync.reload);

	browserSync({
		open: false,
		proxy: config.browsersync.proxy,
	});
};
