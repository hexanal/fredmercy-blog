import Components from '../core/Components';
import barba from '@barba/core';

const TRANSITION_DURATION = 600;

export default function() {
	this.onMount = function() {
		barba.init({
			timeout: 10000,

			prevent: ({ el }) => 'disableTransition' in el.dataset,

			transitions: [{
				before() {
					Components.broadcast('PLAY_SOUND', 'woaw');
					Components.flush();
				},
				leave({ current, next }) {
					return new Promise(resolve => {
						Components.broadcast('PAGE_LEAVE', { current, next });
						document.body.classList.add('state-body-transition');

						setTimeout(() => {
							Components.broadcast('PLAY_SOUND', 'womp');
							resolve();
						}, TRANSITION_DURATION);
					});
				},
				beforeEnter({ current }) {
					document.body.classList.remove('state-body-transition');
					current.container.style.position = 'absolute';
				},
				enter({ current, next }) {
					return new Promise(resolve => {
						window.scrollTo(0, 0);
						next.container.removeAttribute('style'); // prevent weirdness with the transform
						resolve();
					});
				},
				afterEnter({ current, next }) {
					Components.mountAllInsideContainer(next.container);
					Components.broadcast('PAGE_CHANGED', { current, next });
				},
			} ]
		});
	}
}

// fixme: enable analytics
// barba.hooks.after(() => {
// ga('set', 'page', window.location.pathname);
// ga('send', 'pageview');
// });
