import Mousetrap from 'mousetrap';
import Storage from 'utils/Storage';

export default function() {
	this.global = true;
	this.state = {
		useBigFont: false
	};

	this.listen = (id, payload) => {
		if (id === 'A11Y_SET_LARGE_FONT') {
			this.updateFontSize(payload);
		}
	}

	this.onMount = function() {
		this.state.useBigFont = Storage.flag('a11y_use_big_font');

		if (this.state.useBigFont) {
			document.documentElement.classList.add('state-a11y-big-font');
		} else {
			document.documentElement.classList.remove('state-a11y-big-font');
		}

		Mousetrap.bind('=', () => this.updateFontSize(true) );
		Mousetrap.bind('-', () => this.updateFontSize(false) );
	}

	this.updateFontSize = function(useBig) {
		document.documentElement.classList.toggle('state-a11y-big-font', useBig);
		Storage.set('a11y_use_big_font', useBig);
	}
}
