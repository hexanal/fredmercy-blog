var gulp = require('gulp');

var entries = require('./tasks/entries.js');

var reset = require('./tasks/reset.js');
var scss = require('./tasks/scss.js');
var images = require('./tasks/images.js');
var fonts = require('./tasks/fonts.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('entries:index', entries.index);
gulp.task('entries:posts', entries.posts);
gulp.task('entries:pages', entries.pages);
gulp.task('entries', gulp.parallel('entries:index', 'entries:posts', 'entries:pages'));

gulp.task('scss', scss);

gulp.task('images', images);

gulp.task('fonts', fonts);

gulp.task('build', gulp.parallel('entries', 'images', 'fonts', 'scss'));

gulp.task('watch:fonts', function() {
	gulp.watch(config.fonts.watch, gulp.series('fonts'));
});
gulp.task('watch:posts', function() {
	gulp.watch(config.pages.watch, gulp.series('entries:posts'));
});
gulp.task('watch:pages', function() {
	gulp.watch(config.pages.watch, gulp.series('entries:pages'));
});
gulp.task('watch:posts', function() {
	gulp.watch(config.posts.watch, gulp.series('entries'));
});
gulp.task('watch:scss', function() {
	gulp.watch(config.scss.watch, gulp.series('scss'));
});
gulp.task('watch:images', function() {
	gulp.watch(config.images.watch, gulp.series('images'));
});
gulp.task('watch', gulp.parallel('watch:fonts', 'watch:posts', 'watch:posts', 'watch:pages', 'watch:scss', 'watch:images'));

gulp.task('kickstart', gulp.series('build', 'watch'));
