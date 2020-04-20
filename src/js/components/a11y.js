import Mousetrap from 'mousetrap';
import Storage from 'utils/Storage';

export default function() {
	this.global = true;
	this.state = {
		useBigFont: false
	};

	this.onMount = function() {
		this.state.useBigFont = Storage.flag('a11y_use_big_font');

		if (this.state.useBigFont) {
			document.documentElement.classList.add('state-a11y-big-font');
		} else {
			document.documentElement.classList.remove('state-a11y-big-font');
		}

		Mousetrap.bind('=', () => this.updateFontSize(1) );
		Mousetrap.bind('-', () => this.updateFontSize(0) );
	}

	this.updateFontSize = function(useBig) {
		Storage.set('a11y_use_big_font', useBig);
		document.documentElement.classList.toggle('state-a11y-big-font', (useBig > 0));
	}
}
