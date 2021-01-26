export default function({ element, control, messaging }) {
	const state = {
		id: element.dataset.boxId,
		active: false,
	};

	const toggle = () => {
		state.active = !state.active;
		element.classList.toggle('state-box-active');

		if (state.active) {
			DOMHelpers.focusFirstItem(element);
		}
	}

	const open = () => {
		state.active = true;
		element.classList.add('state-box-active');
	}

	const close = () => {
		state.active = false;
		element.classList.remove('state-box-active');
	}

	const eventToggle = messaging.subscribe(`TOGGLE_BOX_${state.id.toUpperCase()}`, toggle)
	const eventShow = messaging.subscribe(`SHOW_BOX_${state.id.toUpperCase()}`, open)
	const eventClose = messaging.subscribe(`CLOSE_BOX_${state.id.toUpperCase()}`, close)

	control['close'].addEventListener('click', close);
	control['bg'].addEventListener('click', close);

	Mousetrap(element).bind('escape', close);

	return function() {
		eventToggle();
		eventShow();
		eventClose();
	}
}
