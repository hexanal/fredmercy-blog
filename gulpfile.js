var gulp = require('gulp');

var entries = require('./tasks/entries.js');
var photos = require('./tasks/photos.js');

var reset = require('./tasks/reset.js');
var scss = require('./tasks/scss.js');
var images = require('./tasks/images.js');
var fonts = require('./tasks/fonts.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('entries:index', entries.index);
gulp.task('entries:posts', entries.posts);
gulp.task('entries', gulp.parallel('entries:index', 'entries:posts'));

gulp.task('photos:index', photos.index);
gulp.task('photos:files', photos.copy);
gulp.task('photos', gulp.parallel('photos:index', 'photos:files'));

gulp.task('scss', scss);

gulp.task('images', images);

gulp.task('fonts', fonts);

gulp.task('build', gulp.parallel('entries', 'photos', 'images', 'fonts', 'scss'));

gulp.task('watch:fonts', function() {
	gulp.watch(config.fonts.watch, gulp.series('fonts'));
});
gulp.task('watch:html', function() {
	gulp.watch(config.html.watch, gulp.series('entries', 'photos:index'));
});
gulp.task('watch:photos', function() {
	gulp.watch(config.photos.watch, gulp.series('photos'));
});
gulp.task('watch:scss', function() {
	gulp.watch(config.scss.watch, gulp.series('scss'));
});
gulp.task('watch:images', function() {
	gulp.watch(config.images.watch, gulp.series('images'));
});
gulp.task('watch', gulp.parallel('watch:fonts', 'watch:html', 'watch:photos', 'watch:scss', 'watch:images'));

gulp.task('kickstart', gulp.series('build', 'watch'));
