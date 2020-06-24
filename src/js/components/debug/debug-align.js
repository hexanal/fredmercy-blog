import Mousetrap from 'mousetrap';

export default function({element, ui, control, messaging}) {
	const state = {
		enabled: false,
	};

	const onTabsSwitched = ({tabId, origin}) => {
		if (origin.id === 'debug-tabs') {
			toggleAlign(tabId === 'align');
			hideCursorOnActive();
		}
	};

	const onDebugToggleSet = ({prop}) => {
		if (prop === 'displayVertical' || prop === 'displayHorizontal') {
			hideCursorOnActive();
		}
	};

	messaging.subscribe('TABS_SWITCHED', onTabsSwitched);
	messaging.subscribe('DEBUG_TOGGLE_WAS_SET', onDebugToggleSet);

	document.addEventListener('mousemove', e => {
		const { clientX, clientY } = e;
		element.style.setProperty('--x', `translate3d(${clientX}px, 0, 0)`);
		element.style.setProperty('--y', `translate3d(0, ${clientY}px, 0)`);
		ui['line-vertical'].dataset.position = clientX;
		ui['line-vertical'].dataset.position = clientY;
	});

	const hideCursorOnActive = () => {
		const enabled = ( state.enabled && control['display-vertical'] && control['display-horizontal'] );
		const areBothLinesActive = control['display-vertical'].checked && control['display-horizontal'].checked;
		const shouldHideCursor = ( enabled && areBothLinesActive );
		document.documentElement.toggleAttribute('data-hide-cursor', shouldHideCursor);
	};

	const toggleAlign = enable => {
		state.enabled = enable;
	};

	return function() {
		messaging.unsubscribe('TABS_SWITCHED', onTabsSwitched);
		messaging.unsubscribe('DEBUG_TOGGLE_WAS_SET', onDebugToggleSet);
	}
}
