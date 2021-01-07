import debounce from 'lodash.debounce'
import reefer from '../tools/reefer/reefer'

// const DELAY_MULTIPLIER = 70 // milliseconds
const TRANSLATE_MULTIPLIER = 32 // pixels
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75

export default function({ messaging }) {
	const rainbows = document.body.querySelector('#rainbow')
	const transitionBall = document.body.querySelector('#rainbow-ball')

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
		ball: 0,
		pointerX: 0,
		pointerY: 0,
		transition: 0 // test
	})

	const setDirectionFromBreakpoint = () => {
		const { innerWidth } = window
		const direction = innerWidth <= 800 ? 'X' : 'Y'

		state.direction = direction
	}

	window.addEventListener('resize', debounce( setDirectionFromBreakpoint, 500 ) )
	setDirectionFromBreakpoint()

	document.addEventListener('mousemove', e => {
		state.reef.set({ pointerX: e.clientX, pointerY: e.clientY }, { stiffness: 250, damping: 15 })
	})
	// document.addEventListener('touchstart', e => {
	// 	state.reef.set({ pointerX: e.clientX, pointerY: e.clientY }, { stiffness: 250, damping: 15 })
	// })
	// document.addEventListener('touchmove', e => {
	// 	state.reef.set({ pointerX: e.clientX, pointerY: e.clientY }, { stiffness: 250, damping: 15 })
	// })

	state.reef.onFrame( ({ translate, opacity, transition, pointerX, pointerY, ball }) => {
		state.container.style.transform = `translateY(${ translate * TRANSLATE_MULTIPLIER }px)`
		state.container.style.opacity = opacity

		state.frame = state.frame < TOTAL_FRAMES
			? state.frame + (FRAME_MULTIPLIER * transition)
			: 0

		rainbows.style.transform = `translate${state.direction}(-${ state.frame }%)`
		// TODO random color
		transitionBall.style.transform = `translate(-50%, -50%) translate3d(${pointerX}px, ${pointerY}px, 0) scale(${ ball })`
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
		state.reef.set({ translate: -2 }, { stiffness: 50, damping: 40 })
		state.reef.set({ opacity: 0, transition: 1, ball: 1 }, { stiffness: 200, damping: 14 })
	}

	const reefIn = function() {
		state.reef.set({ translate: 0, opacity: 1 }, { stiffness: 400, damping: 18 })
		state.reef.set({ ball: 0 }, { stiffness: 200, damping: 20 })
		state.reef.set({ transition: 0 }, { stiffness: 100, damping: 25 })
	}
}
