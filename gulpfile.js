var gulp = require('gulp');

var content = require('./tasks/content.js');

var reset = require('./tasks/reset.js');
var scss = require('./tasks/scss.js');
var images = require('./tasks/images.js');
var copy = require('./tasks/copy.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('libs', content.libs);
gulp.task('index', content.index);
gulp.task('posts', content.posts);
gulp.task('pages', content.pages);

gulp.task('content', gulp.parallel('libs', 'index', 'posts', 'pages'));

gulp.task('scss', scss);

gulp.task('images', images);

gulp.task('copy', copy);

gulp.task('build', gulp.parallel('content', 'images', 'copy', 'scss'));

gulp.task('watch:copy', function() {
	gulp.watch(config.copy.watch, gulp.series('copy'));
});
gulp.task('watch:posts', function() {
	gulp.watch(config.pages.watch, gulp.series('posts'));
});
gulp.task('watch:pages', function() {
	gulp.watch(config.pages.watch, gulp.series('pages'));
});
gulp.task('watch:posts', function() {
	gulp.watch(config.posts.watch, gulp.series('content'));
});
gulp.task('watch:scss', function() {
	gulp.watch(config.scss.watch, gulp.series('scss'));
});
gulp.task('watch:images', function() {
	gulp.watch(config.images.watch, gulp.series('images'));
});
gulp.task('watch', gulp.parallel(
	'watch:posts',
	'watch:pages',
	'watch:copy',
	'watch:scss',
	'watch:images'
));

gulp.task('build:dev', gulp.series('build', 'watch'));
