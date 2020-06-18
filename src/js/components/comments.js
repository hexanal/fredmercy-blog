import axios from 'axios';
import Mousetrap from 'mousetrap';

export default function({element, ui, control, messaging}) {
	const state = {
		entryId: null,
		entryComments: {},
	};

	const fetchComments = function() {
		element.classList.add('state-loading');

		axios.get('/api/comments/' + state.entryId)
			.then( ({data}) => {
				element.classList.remove('state-loading');
				control['dot'].map(dot => dot.removeAttribute('disabled'));

				data.comments.map((comment) => {
					const commentDot = element.querySelector(`#comment_${comment.slot}`);
					state.entryComments[comment.slot] = {
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

	const showComment = function(dotId) {
		const { author, content } = state.entryComments[dotId];

		select(dotId);
		closeAll();

		ui['comment-dot'].innerHTML = dotId;
		ui['comment-body'].innerHTML = author;
		ui['comment-author'].innerHTML = content;
		ui['read-comment'].classList.add('state-read-comment-active');
	};

	const showWriteForm = function(dotId) {
		state.selectedComment = dotId;

		closeAll();
		setDotActive(dotId);

		element.toggleAttribute('data-leaving-comment', true);
		ui['leave-comment-popup'].classList.add('state-leave-comment-active');
		ui['selected-dot'].textContent = state.selectedComment;

		control['content'].focus();
	};

	const closeAll = () => {
		unselectAllComments();

		element.toggleAttribute('data-leaving-comment', false);
		ui['read-comment'].classList.remove('state-read-comment-active');
		ui['leave-comment-popup'].classList.remove('state-leave-comment-active');
	};

	const setDotActive = function(id) {
		control['dot'][id - 1].classList.add('state-selected-comment');
	};

	const select = id => {
		control['dot'][id - 1].focus();
	};

	const unselectAllComments = function() {
		control['dot'].map(dot => {
			dot.classList.remove('state-selected-comment');
		})
	};

	const showErrorMessage = function(msg) {
		alert('Woops, something went wrong. Try again?');
	}

	const moveTo = (inc, e) => {
		if ( !document.activeElement.dataset.index ) return;

		e.preventDefault();
		e.stopPropagation();

		const targetDot = parseInt(document.activeElement.dataset.index, 10) + inc - 1;
		const totalDots = control['dot'].length;

		if ( (targetDot < 0) || (targetDot >= totalDots) ) {
			return messaging.dispatch({ id: 'PLAY_SOUND', payload: 'canc' });
		}

		select(targetDot);
	}

	const moveRight = e => moveTo(1, e);
	const moveLeft = e => moveTo(-1, e);
	const moveDown = e => moveTo(5, e);
	const moveUp = e => moveTo(-5, e);

	const initSpeechModule = function() {
		const Bot = window.speechSynthesis;
		const voices = Bot.getVoices();
		const fredsVoice = voices.filter(voice => voice.name === 'Fred')[0];

		control['speak-comment'].addEventListener('click', () => {
			const utterance = new SpeechSynthesisUtterance(control['content'].value);
			utterance.voice = fredsVoice;
			utterance.pitch = 0.75;
			utterance.rate = 0.8;

			Bot.speak(utterance);
		});
	}

	const readOrEditComment = e => {
		const dotId = e.target.dataset.index;

		if (state.entryComments[dotId]) {
			showComment(dotId);
		} else {
			showWriteForm(dotId);
		}
	};

	const submitComment = e => {
		e.preventDefault();

		const { entryId, selectedComment } = state;

		const author = control['author'].value.trim() !== ''
			? control['author'].value
			: 'Anonymous';
		const content = control['content'].value.trim() !== ''
			? control['content'].value
			: false;

		if (!content) {
			control['content'].focus();
			return showErrorMessage('Be sure to leave a comment before submitting.');
		}

		const data = {
			author,
			content,
			entryId,
			slot: selectedComment // calling the dot a "slot" on the server
		};

		axios.post('/api/comment', data)
			.then(() => {
				state.entryComments[selectedComment] = {
					author,
					content: content.replace(/\n/g, '<br>')
				};

				control['content'].value = '';

				element.querySelector('#comment_' + selectedComment)
					.classList.add('state-has-comment');

				state.selectedComment = null;

				closeAll();
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	state.entryId = ui['grid'].dataset.entryId;

	state.shortcuts = new Mousetrap(element);
	state.shortcuts.bind('escape', closeAll);
	state.shortcuts.bind('h', moveLeft);
	state.shortcuts.bind('j', moveDown);
	state.shortcuts.bind('k', moveUp);
	state.shortcuts.bind('l', moveRight);

	control['dot'].map(dot => dot.addEventListener('click', readOrEditComment) );
	control['close'].map(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault();
			closeAll();
		});
	});
	control['comment-form'].addEventListener('submit', submitComment);

	fetchComments();
	initSpeechModule();
}