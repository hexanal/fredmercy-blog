var config = require('../config.js');
var del = require('del');

module.exports = function() {
	return del([
		config.posts.dest + config.info.rootPath,
		config.pages.dest + config.info.rootPath
	], {
		force: true // allow deleting outside the current working directory
	})
		.then(paths => {
			console.log('Deleted files and folders:\n', paths.join('\n'));
		});
}
