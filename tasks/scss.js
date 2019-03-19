var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config.js');
var input = config.scss.src;
var output = config.scss.dest;

module.exports = function() {
	var stream = gulp.src(input)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			compatibility:
				'ie7,-units.ch,-units.in,-units.pc,-units.pt,-units.rem,' +
				'-units.vh,-units.vm,-units.vmax,-units.vmin'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(output));

	return stream;
};
