import debounce from 'lodash.debounce'
import reefer from '../tools/reefer/reefer'

// const DELAY_MULTIPLIER = 70 // milliseconds
const TRANSLATE_MULTIPLIER = 16 // pixels
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75

export default function({ messaging }) {
const rainbows = document.body.querySelector('#rainbow')
	const state = {
		container: document.body.querySelector('[data-barba="container"]'),
		reef: null,
		transitioning: false,
		frame: 0,
		direction: 'X'
	}

	state.reef = reefer({
		translate: 0,
		opacity: 1,
		transition: 0 // test
	})

	const setDirectionFromBreakpoint = () => {
		const { innerWidth } = window
		const direction = innerWidth <= 800 ? 'X' : 'Y'

		state.direction = direction
	}

	window.addEventListener('resize', debounce( setDirectionFromBreakpoint, 500 ) )
	setDirectionFromBreakpoint()

	state.reef.onFrame( ({ translate, opacity, transition }) => {
		state.container.style.transform = `translate${state.direction}(${ translate * TRANSLATE_MULTIPLIER }px)`
		state.container.style.opacity = opacity

		state.frame = state.frame < TOTAL_FRAMES
			? state.frame + (FRAME_MULTIPLIER * transition)
			: 0

		rainbows.style.transform = `translate${state.direction}(-${ state.frame }%)`
	})

	messaging.subscribe('PAGE_LEAVE', page => {
		state.container = page.current.container
		state.transitioning = true
		reefOut()
	})
	messaging.subscribe('PAGE_CHANGED', page => {
		state.container = page.next.container
		state.transitioning = false
		reefIn()
	})

	const reefOut = function() {
		state.reef.set({ translate: 1, opacity: 0, transition: 1 }, { stiffness: 200, damping: 14 })
	}

	const reefIn = function() {
		state.reef.set({ translate: 0, opacity: 1 }, { stiffness: 380, damping: 20 })
		state.reef.set({ transition: 0 }, { stiffness: 100, damping: 20 })
	}
}
