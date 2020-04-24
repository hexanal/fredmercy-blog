const Z_ATTENUATOR = 10;

export default function() {
	this.component = null;
	this.state = {
		enabled: false,
		enableToggle: null,
		zLevelFilter: null,
		zIndexes: null
	};

	this.onMount = function(component) {
		this.component = component;

		this.state.enableToggle = component.querySelector('[data-js="enable-stack"]');
		this.state.enableToggle.addEventListener('click', this.toggle);

		this.state.zLevelFilter = component.querySelector('[data-js="filter-level"]');
		this.state.zLevelFilter.addEventListener('change', e => this.filterLevel(e.target.val) );
	}

	this.toggle = e => {
		this.state.enabled = !this.state.enabled;
		document.documentElement.dataset.zIndexDebugger = this.state.enabled ? 'enabled' : 'disabled';

		if (!this.state.enabled) return;

		this.state.zIndexes = this.buildZIndexes( document.getElementsByTagName('*') );
		this.addDropdownOptions(this.state.zIndexes);
		this.addDataAttributes(this.state.zIndexes);
	}

	this.buildZIndexes = function(elements) {
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

	this.addDataAttributes = indexes => {
		Object.keys(indexes).map(level => {
			const zed = parseInt(level, 10);

			indexes[level].map(element => {
				element.dataset.z = zed;
			});
		});
	}

	this.addDropdownOptions = indexes => {
		Object.keys(indexes).map(level => {
			this.state.zLevelFilter.options.add( new Option(level, parseInt(level, 10) ) );
		});
	}

	this.reset = function() {
		document.documentElement.classList.remove('state-debug-z-index');
		Object.keys(this.state.zIndexes)
			.map(z => {
				this.state.zIndexes[z].map(el => el.classList.remove('state-debug-filter-z') );
			});
	}

	this.filterLevel = level => {
		document.documentElement.classList.add('state-debug-z-index');

		Object.keys(this.state.zIndexes)
			.map(z => {
				this.toggleLevel(z, level);
			});
	}

	this.toggleLevel = (z, level) => {
		this.state.zIndexes[level].map(el => el.classList.toggle('state-debug-filter-z', (z === level)) );
	}

}
