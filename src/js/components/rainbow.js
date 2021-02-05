import debounce from 'lodash.debounce'
import reefer from '../tools/reefer'

const TRANSLATE_MULTIPLIER = 32 // pixels
const TOTAL_FRAMES = 100
const FRAME_MULTIPLIER = 0.75

export default function({ messaging }) {
	const rainbows = document.body.querySelector('#rainbow')

	const state = {
		container: document.body.querySelector('[data-barba="inside"]'),
		reef: reefer({
			translate: 0,
			opacity: 1,
			transition: 0
		}),
		transitioning: false,
		frame: 0,
		direction: 'X',
	}

	state.reef
		.onFrame( ({ translate, opacity, transition }) => {
			state.container.style.transform = `translateY(${ translate * TRANSLATE_MULTIPLIER }px)`
			state.container.style.opacity = opacity

			state.frame = state.frame < TOTAL_FRAMES
				? state.frame + (FRAME_MULTIPLIER * transition)
				: 0

			rainbows.style.transform = `translate${state.direction}(-${ state.frame }%)`
		})

	const setDirectionFromBreakpoint = () => {
		const { innerWidth } = window
		const direction = innerWidth <= 800 ? 'X' : 'Y'

		state.direction = direction
	}

	window.addEventListener('resize', debounce( setDirectionFromBreakpoint, 500 ) )
	setDirectionFromBreakpoint()

	messaging.subscribe('PAGE_LEAVE', page => {
		state.container = page.current.container.querySelector('[data-barba="inside"]')
		state.transitioning = true
		state.reef.set({ translate: -2 }, { stiffness: 50, damping: 40 })
		state.reef.set({ opacity: 0, transition: 1 }, { stiffness: 200, damping: 14 })
	})
	messaging.subscribe('PAGE_CHANGED', page => {
		state.container = page.next.container.querySelector('[data-barba="inside"]')
		state.transitioning = false
		state.reef.set({ translate: 0, opacity: 1 }, { stiffness: 400, damping: 18 })
		state.reef.set({ transition: 0 }, { stiffness: 100, damping: 25 })
	})
	messaging.subscribe('SET_LOADING', loading => {
		if ( loading ) {
			state.reef.set({ transition: 1 }, { stiffness: 200, damping: 14 })
		} else {
			state.reef.set({ transition: 0 }, { stiffness: 100, damping: 25 })
		}
	})
}
