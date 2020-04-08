import axios from 'axios';
import Utils from '../core/Utils';
const { getChild, getChildren } = Utils.dom;

export default function() {
	this.elements = {
		container: null,
		grid: null,
		dots: null,
		leaveCommentPopup: null,
		leaveCommentForm: null,
		leaveCommentDot: null,
		closeCommentPopupBtn: null,
		commentInputAuthor: null,
		commentInputContent: null,
		readCommentPopup: null,
		readCommentBody: null,
		readCommentAuthor: null,
		readCommentDot: null,
	};
	this.state = {
		entryId: null,
		entryComments: {},
		selectedComment: null
	};

	this.onMount = function(component) {
		this.elements.container = component;
		this.elements.grid = getChild('grid', component);
		this.elements.dots = getChildren('dot', component);
		this.elements.leaveCommentPopup = getChild('leave-comment-popup', component);
		this.elements.leaveCommentForm = getChild('comment-form', component);
		this.elements.leaveCommentDot = getChild('selected-dot', component);
		this.elements.closeCommentPopupBtn = getChildren('close', component);
		this.elements.commentInputAuthor = getChild('author', component);
		this.elements.commentInputContent = getChild('content', component);
		this.elements.readCommentPopup = getChild('read-comment', component);
		this.elements.readCommentBody = getChild('comment-body', component);
		this.elements.readCommentAuthor = getChild('comment-author', component);
		this.elements.readCommentDot = getChild('comment-dot', component);

		this.state.entryId = this.elements.grid.dataset.entryId;

		this.fetchComments();

		document.addEventListener('keyup', (e) => {
			if (e.code === 'Escape') this.closeAll(); // close all the popups on Escape
		});

		this.elements.dots.forEach((dot) => {
			dot.addEventListener('click', (e) => {
				const dotId = e.target.dataset.index;

				if (this.state.entryComments[dotId]) {
					this.showComment(dotId);
				} else {
					this.showWriteForm(dotId);
				}
			});
		});

		this.elements.leaveCommentForm.addEventListener('submit', (e) => {
			e.preventDefault();

			const { container, commentInputAuthor, commentInputContent } = this.elements;
			const { entryId, entryComments, selectedComment } = this.state;

			const author = commentInputAuthor.value.trim() !== ''
				? commentInputAuthor.value
				: 'Anonymous';
			const content = commentInputContent.value.trim() !== ''
				? commentInputContent.value
				: false;

			if (!content) {
				this.showErrorMessage('Be sure to leave a comment before submitting.');
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
				.then(() => {
					entryComments[selectedComment] = {
						author,
						content: content.replace(/\n/g, '<br>')
					};

					commentInputContent.value = '';

					container.querySelector('#comment_' + selectedComment)
						.classList.add('state-has-comment');

					this.state.selectedComment = null;

					this.closeAll();
				})
				.catch(function (error) {
					console.error(error);
				});
		});

		this.elements.closeCommentPopupBtn.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				this.closeAll();
			});
		});
	}

	this.fetchComments = function() {
		const { container, dots } = this.elements;

		container.classList.add('state-comments-loading');

		axios.get('/api/comments/' + this.state.entryId)
			.then((res) => {
				const { comments } = res.data;

				container.classList.remove('state-loading');
				dots.forEach(dot => dot.removeAttribute('disabled'));
				comments.map((comment) => {
					const commentDot = container.querySelector(`#comment_${comment.slot}`);
					this.state.entryComments[comment.slot] = {
						author: comment.author,
						content: comment.content.replace(/\n/g, '<br>')
					};
					commentDot.classList.add('state-has-comment');
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	this.showComment = function(dotId) {
		const { author, content } = this.state.entryComments[dotId];
		const { readCommentDot, readCommentAuthor, readCommentBody, readCommentPopup } = this.elements;

		readCommentAuthor.innerHTML = author;
		readCommentBody.innerHTML = content;

		this.closeAll();
		readCommentPopup.classList.add('state-read-comment-active');

		readCommentDot.innerHTML = dotId;
		document.querySelector('#comment_' + dotId)
			.classList.add('state-selected-comment');
	}

	this.showWriteForm = function(dotId) {
		const { container, leaveCommentPopup, leaveCommentDot } = this.elements;
		this.state.selectedComment = dotId;

		this.closeAll();
		leaveCommentPopup.classList.add('state-leave-comment-active');

		leaveCommentDot.innerHTML = this.state.selectedComment;
		container.querySelector('#comment_' + dotId)
			.classList.add('state-selected-comment');
		container.querySelector('[data-js="content"]').focus();
	}

	this.closeAll = function() {
		this.unselectAllComments();
		this.elements.readCommentPopup.classList.remove('state-read-comment-active');
		this.elements.leaveCommentPopup.classList.remove('state-leave-comment-active');
	}

	this.unselectAllComments = function() {
		this.elements.dots.forEach(dot => {
			dot.classList.remove('state-selected-comment');
		})
	}

	this.showErrorMessage = function(msg) {
		alert('Woops, something went wrong. Try again?');
	}
}