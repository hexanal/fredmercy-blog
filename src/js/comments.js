import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

export default function() {
	const commentsGrid = document.querySelector('.js-comments-grid');

	if (!commentsGrid) return;

	/**
	 * Setup
	 */
	const commentsSlots = document.querySelectorAll('.js-comment-slot');
	const leaveCommentPopup = document.querySelector('.js-leave-comment');
	const leaveCommentForm = document.querySelector('.js-comment-form');
	const closeCommentPopupBtn = document.querySelectorAll('.js-comment-close');
	const commentInputAuthor = document.querySelector('.js-comment-author');
	const commentInputContent = document.querySelector('.js-comment-content');
	const readCommentPopup = document.querySelector('.js-read-comment');
	const readCommentBody = document.querySelector('.js-read-comment-body');
	const readCommentAuthor = document.querySelector('.js-read-comment-author');
	const entryId = commentsGrid.dataset.entryId;
	let entryComments = {};
	let selectedComment = null;

	fetchComments();

	/**
	 * Events
	 */
	commentsSlots.forEach((slot) => {
		slot.addEventListener('click', (e) => {
			const slotId = e.target.dataset.letterIndex;

			if (entryComments[slotId]) {
				showComment(slotId);
			} else {
				showWriteForm(slotId);
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
			alert('Unable to leave an empty comment.');
			commentInputContent.focus();

			return;
		}

		const data = {
			author,
			content,
			entryId,
			slot: selectedComment
		};

		axios.post('/api/comment', data)
			.then((res) => {
				entryComments[selectedComment] = {
					author,
					content: sanitizeHtml(content.replace(/\n/g, '<br>'))
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
	// function addComment(data) {
	// }

	function fetchComments() {
		commentsGrid.classList.add('state-loading');

		axios.get('/api/comments/' + entryId)
			.then((res) => {
				const {comments} = res.data;

				commentsGrid.classList.remove('state-loading'); // not loading no more
				comments.map((comment) => {
					const commentSlot = document.querySelector(`#comment_${comment.slot}`);
					entryComments[comment.slot] = {
						author: comment.author,
						content: comment.content.replace(/\n/g, '<br>')
					}; // populate the entryComments;
					commentSlot.classList.add('state-has-comment');
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	/**
	 * UI Work
	 */
	function showComment(slotId) {
		const {author, content} = entryComments[slotId];

		leaveCommentPopup.classList.remove('state-leave-comment-active');
		readCommentPopup.classList.add('state-read-comment-active');

		readCommentAuthor.innerHTML = author;
		readCommentBody.innerHTML = content;
	}

	function showWriteForm(slotId) {
		selectedComment = slotId;

		leaveCommentPopup.classList.add('state-leave-comment-active');
		readCommentPopup.classList.remove('state-read-comment-active');

		document.querySelector('.js-comment-content').focus();
	}

	function closeAll() {
		readCommentPopup.classList.remove('state-read-comment-active');
		leaveCommentPopup.classList.remove('state-leave-comment-active');
	}
}