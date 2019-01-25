var srcBasePath = './src/';
var destBasePath = './blog/dist/';

module.exports = {
	base: {
		src: srcBasePath,
		dest: destBasePath,
	},
	html: {
		watch: [
			srcBasePath + 'views/**/*',
			srcBasePath + 'json/**/*'
		],
		src: srcBasePath + 'json/**/*.json',
		srcViews: srcBasePath + 'views/',
		dest: './blog/',
	},
	scss: {
		watch: srcBasePath + 'scss/**/*.scss',
		src: srcBasePath + 'scss/style.scss',
		dest: destBasePath + 'css',
	},
	js: {
		watch: srcBasePath + 'js/**/*.js',
		entry: 'index.js',
		rename: 'app.js',
		minified: 'app.min.js',
		src: srcBasePath + 'js/index.js',
		dest: destBasePath + 'js',
	},
	images: {
		watch: srcBasePath + 'images/**/*',
		src: srcBasePath + 'images/**/*',
		dest: destBasePath + 'images',
	},
	fonts: {
		watch: srcBasePath + 'fonts/*',
		src: srcBasePath + 'fonts/*',
		dest: destBasePath + 'fonts',
	},
	browsersync: {
		watch: [
			destBasePath + 'images/*', // or whatever
			srcBasePath + 'views/**/*',
			srcBasePath + 'json/**/*'
		],
		proxy: 'http://fredmercyblog.hx'
	},
}
