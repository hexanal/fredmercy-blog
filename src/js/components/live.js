import Components from 'core/Components';
import ConfigManager from 'utils/ConfigManager';
import Calculator from 'utils/Calculator';

const WEBSOCKET_LOCATION = location.host;

export default function() {
	this.state = {
		fuck: false,
	};
	this.el = {};
	this.ui = {}; // todo: maybe extract that logic into Class component refactor coming up?
	this.ws = null;
	this.me = {
		color: 'black',
		id: '—',
	};
	this.players = [];

	this.onMount = function(component, id) {
		this.state.component = component;

		this.ui.intro = component.querySelector('[data-ui="intro"]');
		this.ui.area = component.querySelector('[data-ui="area"]');

		this.el.idInput = component.querySelector('[data-control="id"]');
		this.el.joinBtn = component.querySelector('[data-control="join-btn"]');
		this.el.joinBtn.addEventListener('click', this.join);
	}

	this.join = e => {
		if (this.ws) {
			this.ws.onmessage = this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
			return this.ws.close();
		}

		this.ws = new WebSocket(`ws://${WEBSOCKET_LOCATION}`);
		this.me.id = this.el.idInput.value;
		this.me.color = `rgb(${Calculator.getRandomInt(0, 255)}, ${Calculator.getRandomInt(0, 255)}, ${Calculator.getRandomInt(0, 255)})`;

		this.hookWebSocketEvents();
	}

	this.hookWebSocketEvents = function() {
		if (!this.ws) return;

		this.ws.onmessage = e => {
			if (!e.data) return;
			const msg = JSON.parse(e.data);
			this.moveFriend(msg);
		};
		this.ws.onerror = e => {
			console.error('WebSocket error:', e);
		};
		this.ws.onopen = () => {
			console.info('WebSocket Connection Established.');
			this.ui.intro.classList.add('state-ws-open');
		};
		this.ws.onclose = () => {
			console.info('WebSocket Connection Closed.');
			this.ui.intro.classList.remove('state-ws-open');
			this.ws = null;
		};

		document.addEventListener('mousemove', this.broadcastMove);
	}

	this.broadcastMove = e => {
		if (!this.ws) return;

		const { clientX, clientY } = e;
		const { color, id } = this.me;
		const data = JSON.stringify({
			id,
			color,
			pos: {
				x: `${clientX}`,
				y: `${clientY}`,
			}
		});

		this.ws.send(data);
	}

	this.moveFriend = ({color, id, pos}) => {
		if (!id) return;

		const reticle = this.getReticleById(id, color);

		reticle.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	}

	this.getReticleById = function(id, color) {
		const matches = this.players.filter(player => player.id === id);

		return matches.length
			? matches[0]
			: this.addPlayer(id, color);
	}

	this.addPlayer = function(id, color) {
		const reticle = document.createElement('div');

		reticle.classList.add('reticle');
		reticle.dataset.playerId = id;
		reticle.style.setProperty('--color-reticle', color);

		this.ui.area.appendChild(reticle);

		const player = {id, element: reticle};

		this.players.push(player);

		return player;
	  }
}

