export default function({ element, control, messaging }) {
	const state = {
		id: element.dataset.boxId,
		active: false,
	};

	const toggle = () => {
		state.active = !state.active;
		document.body.classList.toggle('state-box-active');

		if (state.active) {
			DOMHelpers.focusFirstItem(element);
		}
	}

	const close = () => {
		state.active = false;
		document.body.classList.remove('state-box-active');
	}

	const eventToggle = messaging.subscribe('SHOW_BOX', id => { if (id === state.id) toggle() } )
	const eventShow = messaging.subscribe('SHOW_BOX', id => { if (id === state.id) toggle() } )
	const eventClose = messaging.subscribe('CLOSE_BOX', id => { if (id === state.id) close() } )

	control['close'].addEventListener('click', close);
	control['help-bg'].addEventListener('click', close);

	// TODO?
	// Mousetrap(element).bind('escape', closeHelp);

	return function() {
		eventToggle();
		eventShow();
		eventClose();
	}
}
