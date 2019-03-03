var srcBasePath = './src/';
var destBasePath = '../main/blog/dist/';

module.exports = {
	info: {
		rootPath: '/blog',
		title: 'Fred Mercy __ blog',
		description: 'A collection of thoughts, I suppose'
	},
	base: {
		src: srcBasePath,
		dest: destBasePath,
	},
	html: {
		watch: [
			'./entries/**/*.md',
			srcBasePath + 'views/**/*'
		],
		src: './entries/**/*.md',
		archives: './archives/**/*.md',
		templates: srcBasePath + 'views/templates/',
		dest: '../main',
	},
	scss: {
		watch: [srcBasePath + 'scss/**/*.scss'],
		src: srcBasePath + 'scss/style.scss',
		dest: destBasePath + 'css',
	},
	js: {
		minified: 'app.min.js',
		src: srcBasePath + 'js/index.js',
		dest: destBasePath + 'js',
	},
	images: {
		watch: [srcBasePath + 'images/**/*'],
		src: srcBasePath + 'images/**/*',
		dest: destBasePath + 'images',
	},
	fonts: {
		watch: [srcBasePath + 'fonts/*'],
		src: srcBasePath + 'fonts/*',
		dest: destBasePath + 'fonts',
	}
}
