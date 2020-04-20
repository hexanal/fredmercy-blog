import Mousetrap from 'mousetrap';

export default function() {
	this.global = true;
	this.state = {
		storage: window.localStorage,
		useBigFont: false
	};

	this.onMount = function() {
		this.state.useBigFont = (this.state.storage.getItem('a11y_use_big_font') > 0);

		if (this.state.useBigFont) {
			document.documentElement.classList.add('state-a11y-big-font');
		} else {
			document.documentElement.classList.remove('state-a11y-big-font');
		}

		Mousetrap.bind('=', () => this.updateFontSize(1) );
		Mousetrap.bind('-', () => this.updateFontSize(0) );
	}

	this.updateFontSize = function(useBig) {
		this.state.storage.setItem('a11y_use_big_font', useBig);
		document.documentElement.classList.toggle('state-a11y-big-font', (useBig > 0));
	}
}
