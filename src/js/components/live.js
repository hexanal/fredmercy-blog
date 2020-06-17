import Calculator from 'tools/Calculator';

const WEBSOCKET_LOCATION = location.host;

export default function({ui, control}) {
	const state = {
		ws: null,
		me: {
			color: 'black',
			id: '—',
		},
		players: []
	};

	control['join-btn'].addEventListener('click', join);

	const join = e => {
		if (state.ws) {
			state.ws.onmessage = state.ws.onerror = state.ws.onopen = state.ws.onclose = null;
			return state.ws.close();
		}

		state.ws = new WebSocket(`ws://${WEBSOCKET_LOCATION}`);
		state.me.id = control['id'].value;
		state.me.color = `rgb(${Calculator.getRandomInt(0, 255)}, ${Calculator.getRandomInt(0, 255)}, ${Calculator.getRandomInt(0, 255)})`;

		hookWebSocketEvents();
	}

	const hookWebSocketEvents = function() {
		if (!state.ws) return;

		state.ws.onmessage = e => {
			if (!e.data) return;
			const msg = JSON.parse(e.data);
			moveFriend(msg);
		};
		state.ws.onerror = e => {
			console.error('WebSocket error:', e);
		};
		state.ws.onopen = () => {
			console.info('WebSocket Connection Established.');
			ui.intro.classList.add('state-ws-open');
		};
		state.ws.onclose = () => {
			console.info('WebSocket Connection Closed.');
			ui.intro.classList.remove('state-ws-open');
			state.ws = null;
		};

		document.addEventListener('mousemove', broadcastMove);
	}

	const broadcastMove = e => {
		if (!state.ws) return;

		const { clientX, clientY } = e;
		const { color, id } = state.me;
		const data = JSON.stringify({
			id,
			color,
			pos: {
				x: `${clientX}`,
				y: `${clientY}`,
			}
		});

		state.ws.send(data);
	}

	const moveFriend = ({color, id, pos}) => {
		if (!id) return;

		const reticle = getReticleById(id, color);

		reticle.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	}

	const getReticleById = function(id, color) {
		const matches = state.players.filter(player => player.id === id);

		return matches.length
			? matches[0]
			: addPlayer(id, color);
	}

	const addPlayer = function(id, color) {
		const reticle = document.createElement('div');

		reticle.classList.add('reticle');
		reticle.dataset.playerId = id;
		reticle.style.setProperty('--color-reticle', color);

		ui['area'].appendChild(reticle);

		const player = {id, element: reticle};

		state.players.push(player);

		return player;
	}
}

