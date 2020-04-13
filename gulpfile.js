var gulp = require('gulp');

var content = require('./tasks/content.js');

var reset = require('./tasks/reset.js');
var scss = require('./tasks/scss.js');
var images = require('./tasks/images.js');
var fonts = require('./tasks/fonts.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('libs', content.libs);
gulp.task('index', content.index);
gulp.task('posts', content.posts);
gulp.task('pages', content.pages);

gulp.task('content', gulp.parallel('libs', 'index', 'posts', 'pages'));

gulp.task('scss', scss);

gulp.task('images', images);

gulp.task('fonts', fonts);

gulp.task('build', gulp.parallel('content', 'images', 'fonts', 'scss'));

gulp.task('watch:fonts', function() {
	gulp.watch(config.fonts.watch, gulp.series('fonts'));
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
	'watch:fonts',
	'watch:posts',
	'watch:posts',
	'watch:pages',
	'watch:scss',
	'watch:images'
));

gulp.task('kickstart', gulp.series('build', 'watch'));
