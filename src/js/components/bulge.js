import reefer from '../tools/reefer/reefer'

export default function({ element }) {
	const motion = reefer({
		scale: 1,
		x: 0,
		y: 0,
	})

	motion.onFrame( ({ scale, x, y }) => {
		const transform = `scale(${scale}) rotateX(${x}deg) rotateY(${y}deg)`

		element.style.transform = transform
	})

	element.addEventListener('mousemove', e => {
		const { clientX, clientY } = e
		const { x, y, width, height } = e.originalTarget.getBoundingClientRect()
		const offsetX = clientX - x
		const offsetY = clientY - y
		const ratioX = offsetX / width - 0.5
		const ratioY = offsetY / height - 0.5

		const positionX =ratioX * 100
		const positionY = ratioY * 100

		motion.set({ x: positionX, y: positionY })
	})
	element.addEventListener('mousedown', e => {
		// console.log( motion.get() )
		motion.set({ scale: 2 })
	});
	element.addEventListener('mouseup', e => {
		motion.set({ scale: 1, x: 0, y: 0 })
	});
}
