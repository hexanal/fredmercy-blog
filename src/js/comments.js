// import axios from 'axios';
import axios from 'axios/dist/axios'; // https://github.com/axios/axios/issues/464

export default function() {
	const commentsGrid = document.querySelector('.js-comments-grid');

	if (!commentsGrid) return;

	/**
	 * Setup
	 */
	const commentsDots = document.querySelectorAll('.js-comment-dot');
	const leaveCommentPopup = document.querySelector('.js-leave-comment');
	const leaveCommentForm = document.querySelector('.js-comment-form');
	const leaveCommentDot = document.querySelector('.js-leave-comment-dot');
	const closeCommentPopupBtn = document.querySelectorAll('.js-comment-close');
	const commentInputAuthor = document.querySelector('.js-comment-author');
	const commentInputContent = document.querySelector('.js-comment-content');
	const readCommentPopup = document.querySelector('.js-read-comment');
	const readCommentBody = document.querySelector('.js-read-comment-body');
	const readCommentAuthor = document.querySelector('.js-read-comment-author');
	const readCommentDot = document.querySelector('.js-read-comment-dot');
	const entryId = commentsGrid.dataset.entryId;
	let entryComments = {};
	let selectedComment = null;

	fetchComments();

	/**
	 * Events
	 */
	document.addEventListener('keyup', (e) => {
		const {key} = e;

		if (key === 'Escape') closeAll(); // close all the popups on Escape
	});

	commentsDots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const dotId = e.target.dataset.index;

			if (entryComments[dotId]) {
				showComment(dotId);
			} else {
				showWriteForm(dotId);
			}
		});
	});

	leaveCommentForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const author = commentInputAuthor.value.trim() !== ''
			? commentInputAuthor.value
			: 'Anonymous';
		const content = commentInputContent.value.trim() !== ''
			? commentInputContent.value
			: false;

		if (!content) {
			showErrorMessage('Be sure to leave a comment before submitting.');
			commentInputContent.focus();

			return;
		}

		const data = {
			author,
			content,
			entryId,
			slot: selectedComment // calling the dot a "slot" on the server
		};

		axios.post('/api/comment', data)
			.then((res) => {
				entryComments[selectedComment] = {
					author,
					content: content.replace(/\n/g, '<br>')
				};

				commentInputContent.value = ''; // clear textarea body

				document.querySelector('#comment_' + selectedComment)
					.classList.add('state-has-comment'); // set blob active :)

				selectedComment = null; // empty selected comment value

				closeAll(); // close everything bruh
			})
			.catch(function (error) {
				console.error(error);
			});
	});

	closeCommentPopupBtn.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			closeAll();
		});
	});

	/**
	 * API Calls
	 */
	function fetchComments() {
		commentsGrid.classList.add('state-loading');

		axios.get('/api/comments/' + entryId)
			.then((res) => {
				const {comments} = res.data;

				commentsGrid.classList.remove('state-loading'); // not loading no more
				comments.map((comment) => {
					const commentDot = document.querySelector(`#comment_${comment.slot}`);
					entryComments[comment.slot] = {
						author: comment.author,
						content: comment.content.replace(/\n/g, '<br>')
					}; // populate the entryComments;
					commentDot.classList.add('state-has-comment');
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	/**
	 * UI Work
	 */
	function showComment(dotId) {
		const {author, content} = entryComments[dotId];

		readCommentAuthor.innerHTML = author;
		readCommentBody.innerHTML = content;

		closeAll();
		readCommentPopup.classList.add('state-read-comment-active');

		readCommentDot.innerHTML = dotId;
		document.querySelector('#comment_' + dotId).classList.add('state-selected-comment');
	}

	function showWriteForm(dotId) {
		selectedComment = dotId;

		closeAll();
		leaveCommentPopup.classList.add('state-leave-comment-active');

		leaveCommentDot.innerHTML = selectedComment;
		document.querySelector('#comment_' + dotId).classList.add('state-selected-comment');
		document.querySelector('.js-comment-content').focus();
	}

	function closeAll() {
		unselectAllComments();
		readCommentPopup.classList.remove('state-read-comment-active');
		leaveCommentPopup.classList.remove('state-leave-comment-active');
	}

	function unselectAllComments() {
		commentsDots.forEach(dot => {
			dot.classList.remove('state-selected-comment');
		})
	}

	function showErrorMessage(msg) {
		console.log('Should show error message: ', msg);
	}
}