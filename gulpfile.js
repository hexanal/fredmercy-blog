var gulp = require('gulp');
var sequence = require('gulp-sequence');

var js = require('./tasks/javascript.js');
var scss = require('./tasks/scss.js');
var handlebars = require('./tasks/handlebars.js');
var images = require('./tasks/images.js');
var copy = require('./tasks/copy.js');
var browsersync = require('./tasks/browsersync.js');

var config = require('./config.js');

gulp.task('handlebars:index', handlebars.index);
gulp.task('handlebars:posts', handlebars.posts);

gulp.task('handlebars', gulp.series('handlebars:index', 'handlebars:posts'));

gulp.task('scss', scss);

gulp.task('js', js.browserify);
gulp.task('js:watch', js.watchify);

gulp.task('images', images);

gulp.task('copy', copy);

gulp.task('build', gulp.parallel('handlebars', 'images', 'copy', 'scss', 'js'));

gulp.task('watch:copy', function() {
	gulp.watch(config.fonts.watch, gulp.series('copy'));
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
gulp.task('watch:js', function() {
	gulp.watch(config.js.watch, gulp.series('js:watch'));
});
gulp.task('watch', gulp.parallel('watch:copy', 'watch:html', 'watch:js', 'watch:scss', 'watch:images'));

gulp.task('serve', gulp.parallel('watch', browsersync));
gulp.task('kickstart', gulp.series('build', 'watch'));
