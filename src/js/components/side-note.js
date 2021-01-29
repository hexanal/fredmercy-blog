export default function({ element }) {
	const state = {
		visible: false
	}

	element.addEventListener('click', (e) => {
		e.stopPropagation()

		toggle()

		if (state.visible) document.addEventListener('click', dismiss)
	})

	const toggle = function() {
		state.visible = !state.visible
		element.classList.toggle('state-note-visible', state.visible)
	}

	const dismiss = function() {
		toggle()
		document.removeEventListener('click', dismiss)
	}
}
