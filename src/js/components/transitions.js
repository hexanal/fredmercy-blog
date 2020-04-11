import Components from '../core/Components';
import barba from '@barba/core';

export default function() {
	this.onMount = function() {
		barba.init({
			timeout: 10000,

			transitions: [
				{
					before() {
						Components.unmountAll();
					},
					leave({ current }) {
						return new Promise(resolve => {
							document.body.classList.add('state-body-transition');
							setTimeout(resolve, 600);
						});
					},
					beforeEnter({ current, next }) {
						document.body.classList.remove('state-body-transition');
						current.container.style.position = 'absolute';
						Components.broadcast("PAGE_CHANGE", next.url);
					},
					enter({ next }) {
						return new Promise(resolve => {
							window.scrollTo(0, 0);
							next.container.removeAttribute('style'); // prevent weirdness with the transform
							resolve();
						});
					},
					afterEnter({ next }) {
						Components.mountAllInsideContainer(next.container);
					},
				}
			]
		});
	}

}

// fixme: enable analytics
// barba.hooks.after(() => {
// ga('set', 'page', window.location.pathname);
// ga('send', 'pageview');
// });
