import Mousetrap from 'mousetrap'
import stater from '../tools/stater'
import reefer from '../tools/reefer'

export default function({ element, ui, control, messaging }) {
	const state = stater({
		id: element.dataset.boxId || '',
		x: element.dataset.boxX || '-50%',
		shortcut: element.dataset.boxShortcut || false,
		active: false,
	})

	const render = ({ y, opacity }) => {
		element.style.display = opacity > 0.001 ? 'block' : 'none'
		ui['frame'].style.opacity = opacity
		ui['frame'].style.transform = `translate(${state.get().x}, ${y * 2}rem)`
		ui['bg'].style.opacity = opacity * 0.9
	}
	const animations = reefer({
		y: 2,
		opacity: 0
	})
		.onFrame( render )

	state.active.changed( active => {
		element.classList.toggle('state-box-active', active)

		Mousetrap[active ? 'bind' : 'unbind']('escape', close)

		const y = active ? 0 : 1
		const opacity = active ? 1 : 0
		const stiffness = active ? 350 : 420

		animations.set({ y }, { stiffness, damping: 12 })
		animations.set({ opacity }, { stiffness, damping: 20 })
	})

	const toggle = () => {
		const { active } = state.get()
		state.active.set(!active)
	}
	const open = () => state.active.set(true)
	const close = () => state.active.set(false)

	const eventToggle = messaging.subscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
	const eventShow = messaging.subscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
	const eventClose = messaging.subscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)

	control['close'].addEventListener('click', close)
	control['bg'].addEventListener('click', close)

	if ( state.get().shortcut ) Mousetrap.bind( state.get().shortcut, toggle )

	state.update()

	return function() {
		eventToggle()
		eventShow()
		eventClose()
	}
}
