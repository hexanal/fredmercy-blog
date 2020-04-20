import axios from 'axios';
import Mousetrap from 'mousetrap';
import Components from 'core/Components';
import DOMHelpers from 'utils/DOMHelpers';

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
		selectedDot: null,
		selectedComment: null
	};

	this.onMount = function(component) {
		this.elements.container = component;
		this.elements.grid = DOMHelpers.getChild('grid', component);
		this.elements.dots = DOMHelpers.getChildren('dot', component);
		this.elements.leaveCommentPopup = DOMHelpers.getChild('leave-comment-popup', component);
		this.elements.leaveCommentForm = DOMHelpers.getChild('comment-form', component);
		this.elements.leaveCommentDot = DOMHelpers.getChild('selected-dot', component);
		this.elements.closeCommentPopupBtn = DOMHelpers.getChildren('close', component);
		this.elements.commentInputAuthor = DOMHelpers.getChild('author', component);
		this.elements.commentInputContent = DOMHelpers.getChild('content', component);
		this.elements.readCommentPopup = DOMHelpers.getChild('read-comment', component);
		this.elements.readCommentBody = DOMHelpers.getChild('comment-body', component);
		this.elements.readCommentAuthor = DOMHelpers.getChild('comment-author', component);
		this.elements.readCommentDot = DOMHelpers.getChild('comment-dot', component);

		this.initSpeechModule();

		this.state.entryId = this.elements.grid.dataset.entryId;

		this.fetchComments();

		this.state.shortcuts = new Mousetrap(this.elements.grid);

		this.state.shortcuts.bind('escape', this.closeAll);
		this.state.shortcuts.bind('h', this.moveLeft);
		this.state.shortcuts.bind('j', this.moveDown);
		this.state.shortcuts.bind('k', this.moveUp);
		this.state.shortcuts.bind('l', this.moveRight);

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

		this.onUmount = function() {
			this.state.shortcuts.reset();
		}

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
		this.select(dotId);
	}

	this.showWriteForm = function(dotId) {
		const { container, leaveCommentPopup, leaveCommentDot } = this.elements;
		this.state.selectedComment = dotId;

		this.closeAll();
		leaveCommentPopup.classList.add('state-leave-comment-active');
		leaveCommentDot.innerHTML = this.state.selectedComment;
		this.select(dotId);

		container.querySelector('[data-js="content"]').focus();
	}

	this.closeAll = () => {
		this.unselectAllComments();
		this.elements.readCommentPopup.classList.remove('state-read-comment-active');
		this.elements.leaveCommentPopup.classList.remove('state-leave-comment-active');
	}

	this.select = id => {
		this.elements.dots.forEach(dot => {
			if (parseInt(dot.dataset.index, 10) === id ) {
				dot.focus();
			}
		});
	}

	this.unselectAllComments = function() {
		this.elements.dots.forEach(dot => {
			dot.classList.remove('state-selected-comment');
		})
	}

	this.showErrorMessage = function(msg) {
		alert('Woops, something went wrong. Try again?');
	}

	this.moveTo = (inc, e) => {
		if ( !document.activeElement.dataset.index ) return;

		e.preventDefault();
		e.stopPropagation();

		const targetDot = parseInt(document.activeElement.dataset.index, 10) + inc;
		const totalDots = this.elements.dots.length;

		if ( (targetDot < 0) || (targetDot > totalDots) ) {
			Components.broadcast('PLAY_SOUND', 'canc');
			return;
		}

		this.select(targetDot);
	}
	this.moveRight = e => this.moveTo(1, e);
	this.moveLeft = e => this.moveTo(-1, e);
	this.moveDown = e => this.moveTo(5, e);
	this.moveUp = e => this.moveTo(-5, e);

	this.initSpeechModule = function() {
		this.elements.leaveCommentBody = DOMHelpers.getChild('content', this.elements.container);
		this.elements.speakCommentBtn = DOMHelpers.getChild('speak-comment', this.elements.container);

		const Bot = window.speechSynthesis;
		const voices = Bot.getVoices();
		const fredsVoice = voices.filter(voice => voice.name === 'Fred')[0];

		this.elements.speakCommentBtn.addEventListener('click', e => {
			const utterance = new SpeechSynthesisUtterance(this.elements.leaveCommentBody.value);
			utterance.voice = fredsVoice;
			utterance.pitch = 0.75;
			utterance.rate = 0.8;

			Bot.speak(utterance);
		});
	}
}