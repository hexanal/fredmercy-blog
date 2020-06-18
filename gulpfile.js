// TODO retire this trusty gulp... with something even WILDER

var gulp = require('gulp');

var content = require('./tasks/content.js');

var reset = require('./tasks/reset.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('index', content.index);
gulp.task('posts', content.posts);
gulp.task('pages', content.pages);

gulp.task('content', gulp.parallel('index', 'posts', 'pages'));

gulp.task('build', gulp.parallel('content'));

gulp.task('watch:posts', function() {
	gulp.watch(config.pages.watch, gulp.series('posts'));
});
gulp.task('watch:pages', function() {
	gulp.watch(config.pages.watch, gulp.series('pages'));
});
gulp.task('watch:posts', function() {
	gulp.watch(config.posts.watch, gulp.series('content'));
});
gulp.task('watch', gulp.parallel(
	'watch:posts',
	'watch:pages'
));

gulp.task('build:dev', gulp.series('build', 'watch'));
