// import reefer from '../tools/reefer'

export default function({ element, ui, control, messaging }) {
	const state = {
		id: element.dataset.boxId,
		active: false,
	};

	// state.reef = reefer({
	// 	translate: 0,
	// 	opacity: 0,
	// })
	// 	.onFrame( ({ translate, opacity, transition, pointerX, pointerY, ball }) => {
	// 		ui['wrap'].style.transform = `translateY(${ (1 - translate) * 2 }rem)`
	// 		ui['frame'].style.opacity = opacity * 0.9
	// 		ui['bg'].style.opacity = opacity * 0.9
	// 		element.classList.toggle('state-box-active', translate === 1);
	// 	})

	const toggle = () => {
		state.active = !state.active;
		element.classList.toggle('state-box-active');
		// state.reef.set({ translate: 1, opacity: 1 }, { stiffness: 320, damping: 14 })
	}

	const open = () => {
		state.active = true;
		element.classList.add('state-box-active');
		// state.reef.set({ translate: 1, opacity: 1 }, { stiffness: 320, damping: 13 })
	}

	const close = () => {
		// state.reef.set({ translate: 0, opacity: 0 }, { stiffness: 200, damping: 17 })
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
