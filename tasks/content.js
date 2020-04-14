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

var replaceTokens = [
	{
		token: '${base_url}',
		replace: config.info.rootPath
	}
];

module.exports = {
	libs: function() {
		return gulp
			.src(config.libs.src)
			.pipe(gulp.dest( config.libs.dest));
	},

	posts: function() {
		return gulp
			.src(config.posts.src)
			.pipe(through.obj(function (file, enc, cb) {
				var params = {
					config,
					pageTitle: config.info.title,
					description: config.info.description,
					rootPath: config.info.rootPath,
					...getEntryParams(file)
				};

				return gulp.src(config.posts.templates + params.template + '.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest( config.posts.dest + params.url))
					.on('error', cb)
					.on('end', cb);
			}));
	},

	index: function() {
		var entries = [];

		return gulp
			.src(config.posts.src)
			.pipe(through.obj(function (file, enc, cb) {
				var front = frontMatter(file.contents.toString());
				var post = getPostPathAndDate(file);
				var archiveData = getArchiveData(post);

				entries.push({
					url: post.url,
					title: front.attributes.title,
					archive: archiveData.title,
					date: post.date,
					rawDate: post.date + 'T12:00:00', // otherwise the formatDate thing returns yesterday's date
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
					config,
					pageTitle: config.info.title,
					description: config.info.description,
					rootPath: config.info.rootPath,
					entries: posts
				};

				return gulp.src(config.posts.templates + 'index.html')
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.posts.dest + config.info.rootPath));
			});
	},

	pages: function() {
		return gulp
			.src(config.pages.src, { allowEmpty: true })
			.pipe(through.obj(function (file, enc, cb) {
				var pageData = frontMatter(file.contents.toString());
				var pageInfo = getPageInfo(file, pageData);
				var jsonData = pageData.attributes.useJSON
					? require(pageInfo.jsonPath)
					: false;

				marked.setOptions({
					gfm: true,
					breaks: true
				});

				var params = {
					config,
					pageTitle: pageData.attributes.title,
					description: pageData.attributes.description,
					rootPath: config.info.rootPath,
					jsonData,
					body: marked(pageData.body),
				};

				return gulp.src(pageInfo.template, { allowEmpty: true })
					.pipe(hb(params, {
						allowedExtensions: ['html', 'hbs'],
						partialsDirectory: [
							config.base.src + '/views/components',
						],
					}))
					.pipe(rename('index.html'))
					.pipe(gulp.dest(config.pages.dest + pageInfo.dest))
					.on('error', cb)
					.on('end', cb);
			}));
	}

}

function getPageInfo(file, pageData) {
	const split = file.history[0].split('/pages/');
	const endPath = split[1];
	const splitPath = endPath.split('/');
	const id = splitPath.pop().replace('.md', '');
	const pagePath = splitPath.join('/');
	const template = pageData.attributes.useTemplate
		? `./pages/${pagePath}/${id}.html`
		: './src/views/templates/page.html';

	return {
		jsonPath: `../pages/${pagePath}/${id}.json`,
		dest: '/blog/' + pagePath,
		template
	};
}

function getEntryParams(file, isArchive) {
	var pageData = frontMatter(file.contents.toString());
	var template = typeof pageData.attributes.template === 'string'
		? pageData.attributes.template
		: 'post'; // default to post template type
	var edit = typeof pageData.attributes.edit === 'string'
		? pageData.attributes.edit
		: false;
	var post = getPostPathAndDate(file);
	var date = post.date;
	var url = post.url;

	marked.setOptions({
		gfm: true,
		breaks: true
	});

	var title = pageData.attributes.title || '';
	var pageTitle = pageData.attributes.title
		? title + ' / ' + config.info.title
		: 'Untitled / ' + config.info.title;

	var body = getEntryBody(pageData.body);

	var comments = typeof pageData.attributes.comments === 'number'
		? pageData.attributes.comments
		: 25;
	var commentsGrid = buildCommentsGrid(date, comments);

	return {
		url: url,
		date: date,
		title: title,
		pageTitle: pageTitle,
		body,
		rawDate: date + 'T12:00:00',
		commentsGrid: commentsGrid,
		template: template,
		edit: edit,
		description: pageData.attributes.description || config.info.title,
		type: pageData.attributes.type
	};
}

function getEntryBody(pageBody) {
	let body;
	// const regex = /\${.*}/gi; // @todo maybe useful later

	replaceTokens.map(({token, replace}) => {
		body = pageBody.replace(token, replace);
	});

	return marked(body);
}

function getPostPathAndDate(file) {
	var pathData = file.relative.slice(0, -3).split('/'); // remove '.md', then split by slash
	// gets you '2019-01-20' and 'file-name-yo', for example

	return {
		url: config.info.rootPath + '/' + pathData[1] + '/' + pathData[2],
		date: pathData[1],
		path: pathData[2]
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

function getArchiveData(post) {
	var dateElements = post.date.split('-');
	var year = dateElements[0];
	var month = getMonthName(dateElements[1]);
	var title = capitalize(month) + ' ' + year;

	return {
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