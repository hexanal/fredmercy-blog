var gulp = require('gulp');
var handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

HandlebarsIntl.registerWith(handlebars); // register helper

var hb = require('gulp-handlebars-html')(handlebars);
var frontMatter = require('front-matter');
var marked = require('marked');
var rename = require('gulp-rename');
var through = require('through2');
var config = require('../config');
var orderBy = require('lodash.orderby');
var groupBy = require('lodash.groupby');

module.exports = {
	index: function() {
		var entries = [];

		return gulp
			.src(config.html.src)
			.pipe(through.obj(function (file, enc, cb) {
				var front = frontMatter(file.contents.toString());
				var post = getPostPathAndDate(file);

				entries.push({
					url: post.url,
					title: front.attributes.title,
					date: post.date,
					rawDate: post.date + 'T12:00:00', // otherwise the formatDate thing returns yesterday's date
					description: front.attributes.description,
					type: front.attributes.type
				});

				cb(null);
			}))
			.on('end', function() {
				var isoDate = new Date().toISOString().split('T');
				var lastUpdatedOn = isoDate[0];
				var posts = orderBy(entries, 'date', 'desc'); // reorder, and populate our pageData
				var params = {
					pageTitle: config.info.title,
					description: config.info.description,
					entries: posts,
					stats: {
						numberOfEntries: entries.length,
						lastUpdatedOn: lastUpdatedOn
					}
				};

				return gulp.src(config.html.templates + 'index.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.html.dest + config.info.rootPath));
			});
	},

	posts: function() {
		return gulp
			.src(config.html.src)
			.pipe(through.obj(function (file, enc, cb) {
				var params = getEntryParams(file);

				return gulp.src(config.html.templates + params.template + '.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest( config.html.dest + params.url))
					.on('error', cb)
					.on('end', cb);
			}));
	},

	archives: function() {
		return gulp
			.src(config.html.archives)
			.pipe(through.obj(function (file, enc, cb) {
				var params = getEntryParams(file, true);

				return gulp.src(config.html.templates + params.template + '.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest( config.html.dest + params.url))
					.on('error', cb)
					.on('end', cb);
			}));
	},

	archivesIndex: function() {
		var entries = [];

		return gulp
			.src(config.html.archives)
			.pipe(through.obj(function (file, enc, cb) {
				var front = frontMatter(file.contents.toString());
				var post = getPostPathAndDate(file);
				var archiveData = getArchiveUrl(post);

				entries.push({
					url: archiveData.url,
					title: front.attributes.title,
					archive: capitalize(archiveData.month) + ' ' + archiveData.year,
					date: post.path,
					rawDate: post.path + 'T12:00:00', // otherwise the formatDate thing returns yesterday's date
					description: front.attributes.description,
					type: front.attributes.type
				});

				cb(null);
			}))
			.on('end', function() {
				var posts = groupBy(orderBy(entries, 'date', 'desc'), function(post) {
					return post.archive;
				});
				var params = {
					pageTitle: 'Archives __ ' + config.info.title,
					description: 'Archives of past entries for my blog.',
					entries: posts
				};

				return gulp.src(config.html.templates + 'archive.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.html.dest + config.info.rootPath + '/archives'));
			});
	}
}

function getEntryParams(file, isArchive) {
	var pageData = frontMatter(file.contents.toString());
	var template = typeof pageData.attributes.template === 'string'
		? pageData.attributes.template
		: 'post'; // default to post template type
	var post = getPostPathAndDate(file);
	var date = isArchive === true ? post.path : post.date;
	var archiveUrl = getArchiveUrl(post);
	var url = isArchive === true ? archiveUrl.url : post.url;

	marked.setOptions({
		gfm: true,
		breaks: true
	});

	var title = pageData.attributes.title || '';
	var pageTitle = pageData.attributes.title
		? title + ' __ ' + config.info.title
		: 'Untitled __ ' + config.info.title;
	var comments = typeof pageData.attributes.comments === 'number'
		? pageData.attributes.comments
		: 25;
	var commentsGrid = buildCommentsGrid(date, comments);

	return {
		isArchive: isArchive,
		url: url,
		date: date,
		title: title,
		pageTitle: pageTitle,
		rawDate: date + 'T12:00:00',
		commentsGrid: commentsGrid,
		template: template,
		description: pageData.attributes.description || config.info.title,
		body: marked(pageData.body),
		type: pageData.attributes.type
	};
}

function getPostPathAndDate(file) {
	var pathData = file.relative.slice(0, -3).split('/'); // remove '.md', then split by slash
	// gets you '2019-01-20' and 'file-name-yo', for example

	return {
		url: config.info.rootPath + '/' + pathData[0] + '/' + pathData[1],
		date: pathData[0],
		path: pathData[1],
		extra: pathData[2]
	};
}

function buildCommentsGrid(entryId, comments) {
	if (comments === 0) return;

	return Array(comments).fill(null).map((val, index) => {
		return {
			entryId,
			index: index + 1,
			commentId: entryId + '_' + (index + 1)
		}
	});
}

function getArchiveUrl(post) {
	var dateElements = post.path.split('-');
	var year = dateElements[0];
	var month = getMonthName(dateElements[1]);
	var title = month + '-' + year;
	var postPath = config.info.rootPath + '/' + post.path + '/' + post.extra; // path is.. date, extra is the entry title

	return {
		url: postPath,
		title: title,
		month: month,
		year: year
	};
}

function getMonthName(number) {
	var month;

	switch(number) {
		case '01':
			month = 'january';
			break;
		case '02':
			month = 'february';
			break;
		case '03':
			month = 'march';
			break;
		case '04':
			month = 'april';
			break;
		case '05':
			month = 'may';
			break;
		case '06':
			month = 'june';
			break;
		case '07':
			month = 'july';
			break;
		case '08':
			month = 'august';
			break;
		case '09':
			month = 'september';
			break;
		case '10':
			month = 'october';
			break;
		case '11':
			month = 'november';
			break;
		case '12':
			month = 'december';
			break;
		default:
			month = 'unknown-month';
			break;
	}

	return month;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
