import reefer from '../tools/reefer'

const ACTIVE_Z_INDEX = 3
const MIN_SCALE = 0

export default function({ messaging }) {
	const element = document.querySelector('#ball')
	const animated = reefer({ scale: MIN_SCALE }).onFrame( ({ scale }) => {
		element.style.zIndex = scale > MIN_SCALE ? ACTIVE_Z_INDEX : -1
		element.style.transform = `translate(-50%, -50%) scale(${ scale })`
	})

	messaging.subscribe('PAGE_LEAVE', () => animated.set({ scale: 1 }, { stiffness: 200, damping: 25 }) )
	messaging.subscribe('PAGE_CHANGED', () => animated.set({ scale: 0 }, { stiffness: 200, damping: 25 }) )
}
