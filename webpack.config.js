const path = require('path');
const config = require('./config.js');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : false,
		entry: config.js.src,
		output: {
			path: config.js.dest,
			filename: config.js.minified,
			path: path.resolve(__dirname, config.js.dest)
		},
		resolve: {
			extensions: ['.js'],
			modules: [
				path.resolve(config.base.src + 'js'),
				path.resolve('./node_modules')
			]
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		}
	};
}
