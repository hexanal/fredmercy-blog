const Z_ATTENUATOR = 10;

export default function({control}) {
	const state = {
		enabled: false,
		enableToggle: null,
		zLevelFilter: null,
		zIndexes: null
	};

	const toggle = () => {
		state.enabled = !state.enabled;
		document.documentElement.dataset.zIndexDebugger = state.enabled ? 'enabled' : 'disabled';

		if (!state.enabled) return;

		state.zIndexes = buildZIndexes( document.getElementsByTagName('*') );
		addDropdownOptions(state.zIndexes);
		addDataAttributes(state.zIndexes);
	};

	// TODO fix this one...
	const buildZIndexes = function(elements) {
		let zs = {};

		for (let i = 0; i <= elements.length; i++) {
			const element = elements[i];

			if (!element || element.nodeName === 'SCRIPT') continue;

			const styles = window.getComputedStyle(element);
			const z = styles.getPropertyValue('z-index');

			if (!z || z === 'auto') continue;

			if ( !zs[z] ) {
				zs[z] = [element];
			} else {
				zs[z].push(element);
			}
		}

		return zs;
	}

	const addDataAttributes = indexes => {
		Object.keys(indexes).map(level => {
			const zed = parseInt(level, 10);

			indexes[level].map(element => {
				element.dataset.z = zed;
			});
		});
	}

	const addDropdownOptions = indexes => {
		Object.keys(indexes).map(level => {
			state.zLevelFilter.options.add( new Option(level, parseInt(level, 10) ) );
		});
	}

	const reset = function() {
		document.documentElement.classList.remove('state-debug-z-index');
		Object.keys(state.zIndexes)
			.map(z => {
				state.zIndexes[z].map(el => el.classList.remove('state-debug-filter-z') );
			});
	}

	const filterLevel = level => {
		document.documentElement.classList.add('state-debug-z-index');

		Object.keys(state.zIndexes)
			.map(z => {
				toggleLevel(z, level);
			});
	}

	const toggleLevel = (z, level) => {
		state.zIndexes[level].map(el => el.classList.toggle('state-debug-filter-z', (z === level)) );
	}

	control['enable-stack'].addEventListener('click', toggle);
	control['filter-level'].addEventListener('change', e => filterLevel(e.target.val) );
}
