import barba from '@barba/core';

// const TRANSITION_DURATION = 600;
const TRANSITION_DURATION = 1000;

export default function({messaging, _exponent}) {

	messaging.subscribe('NAVIGATE_TO', ({href}) => barba.go(href) );

	barba.init({
		timeout: 10000,
		// debug: true,

		prevent: ({ el }) => 'disableTransition' in el.dataset,

		transitions: [{
			before() {
				_exponent.unmount();
			},
			leave({ current, next }) {
				return new Promise(resolve => {
					messaging.dispatch({ id: 'PAGE_LEAVE', payload: { current, next } });
					// document.body.classList.add('transition');

					setTimeout(() => {
						resolve();
					}, TRANSITION_DURATION);
				});
			},
			beforeEnter({ current }) {
				// document.body.classList.remove('transition');
				current.container.style.position = 'absolute';
			},
			enter({ next }) {
				return new Promise(resolve => {
					window.scrollTo(0, 0);
					resolve();
				});
			},
			afterEnter({ current, next }) {
				_exponent.mount(next.container);
				messaging.dispatch({ id: 'PAGE_CHANGED', payload: { current, next } });
				// next.container.removeAttribute('style'); // prevent weirdness with the transform
			},
		} ]
	});
}
