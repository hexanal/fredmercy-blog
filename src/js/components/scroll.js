export default function() {
	this.global = true;
	this.state = {
		scrollY: 0,
		scrollDirection: 'DOWN',
		scrollPastViewport: false,
	};

	this.onMount = function() {
		document.addEventListener('scroll', this.onScroll);
	}

	this.onScroll = e => {
		const { scrollY, innerHeight } = window;

		this.state.scrollDirection = scrollY > this.state.scrollY ? 'DOWN' : 'UP';
		this.state.scrollY = scrollY;
		this.state.scrollPastViewport = scrollY >= innerHeight;

		document.documentElement.dataset.scrollDirection = this.state.scrollDirection;
		document.documentElement.dataset.scrolledPastViewport = this.state.scrollPastViewport;
	}
}
