import debounce from 'lodash.debounce'
import reefer from '../tools/reefer'

const TRANSLATE_MULTIPLIER = 32 // pixels
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75
const COLORS = [
	'--color-primary',
	'--color-secondary',
	'--color-subdued'
]

export default function({ element, messaging }) {
	const rainbows = document.body.querySelector('#rainbow')
	const transitionBall = document.body.querySelector('#rainbow-ball')

	const state = {
		container: document.body.querySelector('[data-barba="inside"]'),
		reef: reefer({
			translate: 0,
			opacity: 1,
			ball: 0,
			pointerX: 0,
			pointerY: 0,
			transition: 0 // test
		}),
		transitioning: false,
		frame: 0,
		direction: 'X',
		color: COLORS[0]
	}

	state.reef
		.onFrame( ({ translate, opacity, transition, pointerX, pointerY, ball }) => {
			state.container.style.transform = `translateY(${ translate * TRANSLATE_MULTIPLIER }px)`
			state.container.style.opacity = opacity

			state.frame = state.frame < TOTAL_FRAMES
				? state.frame + (FRAME_MULTIPLIER * transition)
				: 0

			rainbows.style.transform = `translate${state.direction}(-${ state.frame }%)`
			transitionBall.style.transform = `translate(-50%, -50%) translate3d(${pointerX}px, ${pointerY}px, 0) scale(${ ball })`
			transitionBall.style.backgroundColor = `var(${ state.color })`
		})

	const setDirectionFromBreakpoint = () => {
		const { innerWidth } = window
		const direction = innerWidth <= 800 ? 'X' : 'Y'

		state.direction = direction
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	const getRandomColor = function() {
		return COLORS[ getRandomInt(0, COLORS.length) ]
	}

	window.addEventListener('resize', debounce( setDirectionFromBreakpoint, 500 ) )
	setDirectionFromBreakpoint()

	document.addEventListener('mousemove', e => {
		state.reef.set({ pointerX: e.clientX, pointerY: e.clientY }, { stiffness: 500, damping: 15 })
	})
	document.addEventListener('click', e => {
		state.reef.set({ pointerX: e.clientX, pointerY: e.clientY }, { stiffness: 330, damping: 15 })
	})

	messaging.subscribe('PAGE_LEAVE', page => {
		state.color = getRandomColor()
		state.container = page.current.container.querySelector('[data-barba="inside"]')
		state.transitioning = true
		reefOut()
	})
	messaging.subscribe('PAGE_CHANGED', page => {
		state.container = page.next.container.querySelector('[data-barba="inside"]')
		state.transitioning = false
		reefIn()
	})
	messaging.subscribe('SET_LOADING', loading => {
		if ( loading ) {
			state.reef.set({ transition: 1 }, { stiffness: 200, damping: 14 })
		} else {
			state.reef.set({ transition: 0 }, { stiffness: 100, damping: 25 })
		}
	})

	const reefOut = function() {
		state.reef.set({ translate: -2 }, { stiffness: 50, damping: 40 })
		state.reef.set({ ball: 1 }, { stiffness: 200, damping: 25 })
		state.reef.set({ opacity: 0, transition: 1 }, { stiffness: 200, damping: 14 })
	}

	const reefIn = function() {
		state.reef.set({ translate: 0, opacity: 1 }, { stiffness: 400, damping: 18 })
		state.reef.set({ ball: 0 }, { stiffness: 200, damping: 25 })
		state.reef.set({ transition: 0 }, { stiffness: 100, damping: 25 })
	}
}
