var gulp = require('gulp');

var reset = require('./tasks/reset.js');
var scss = require('./tasks/scss.js');
var handlebars = require('./tasks/handlebars.js');
var images = require('./tasks/images.js');
var fonts = require('./tasks/fonts.js');

var config = require('./config.js');

gulp.task('reset', reset);

gulp.task('handlebars:index', handlebars.index);
gulp.task('handlebars:posts', handlebars.posts);

gulp.task('handlebars', gulp.parallel('handlebars:index', 'handlebars:posts'));

gulp.task('scss', scss);

gulp.task('images', images);

gulp.task('fonts', fonts);

gulp.task('build', gulp.parallel('handlebars', 'images', 'fonts', 'scss'));

gulp.task('watch:fonts', function() {
	gulp.watch(config.fonts.watch, gulp.series('fonts'));
});
gulp.task('watch:html', function() {
	gulp.watch(config.html.watch, gulp.series('handlebars'));
});
gulp.task('watch:scss', function() {
	gulp.watch(config.scss.watch, gulp.series('scss'));
});
gulp.task('watch:images', function() {
	gulp.watch(config.images.watch, gulp.series('images'));
});
gulp.task('watch', gulp.parallel('watch:fonts', 'watch:html', 'watch:scss', 'watch:images'));

gulp.task('kickstart', gulp.series('build', 'watch'));
