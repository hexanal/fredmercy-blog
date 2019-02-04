var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('utils-merge');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var gutil = require('gulp-util');
var chalk = require('chalk');

var config = require('../config.js');
var js = config.js;
var entry = config.base.src + 'js/' + js.entry;

function map_error(err) {
	if (err.fileName) {
		// regular error
		gutil.log(chalk.red(err.name)
		+ ': '
		+ chalk.yellow(err.fileName)
		+ ': '
		+ 'Line '
		+ chalk.magenta(err.lineNumber)
		+ ' & '
		+ 'Column '
		+ chalk.magenta(err.columnNumber || err.column)
		+ ': '
		+ chalk.blue(err.description))
	} else {
		gutil.log(chalk.red(err.name)
		+ ': '
		+ chalk.yellow(err.message))
	}

	this.end()
}

function runWatchify() {
	var args = merge(watchify.args, { debug: true })
	var bundler = watchify(browserify(entry, args))
		.transform(babelify, {presets: ['@babel/preset-env']});

	bundle_js(bundler);

	bundler.on('update', function () {
		bundle_js(bundler)
	});
}

function bundle_js(bundler) {
	return bundler.bundle()
		.on('error', map_error)
		.pipe(source(js.entry))
		.pipe(buffer())
		.pipe(rename(js.rename))
		.pipe(gulp.dest(js.dest))
		.pipe(rename(js.minified))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(js.dest));
}

// Without watchify
function runBrowserify() {
	var bundler = browserify(entry, { debug: true })
		.transform(babelify, {presets: ['@babel/preset-env']});

	return bundle_js(bundler);
}

// Without sourcemaps
function browserifyProduction() {
	var bundler = browserify(entry)
		.transform(babelify, {});

	return bundler.bundle()
		.on('error', map_error)
		.pipe(source(js.entry))
		.pipe(buffer())
		.pipe(rename(js.minified))
		.pipe(uglify())
		.pipe(gulp.dest(js.dest));
}

module.exports = {
	watchify: runWatchify,
	browserify: runBrowserify,
};
