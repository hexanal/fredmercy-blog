import Mousetrap from 'mousetrap';
import Storage from 'tools/Storage';

export default function({ messaging }) {
	const state = {
		useBigFont: Storage.flag('a11y_use_big_font'),
	};

	messaging.subscribe('A11Y_SET_LARGE_FONT', updateFontSize);

	document.documentElement.classList.toggle('state-a11y-big-font', state.useBigFont);

	Mousetrap.bind('=', () => updateFontSize(true) );
	Mousetrap.bind('-', () => updateFontSize(false) );

	const updateFontSize = function(useBig) {
		document.documentElement.classList.toggle('state-a11y-big-font', useBig);
		Storage.set('a11y_use_big_font', useBig);
	};
}
