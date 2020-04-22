import Mousetrap from 'mousetrap';
import DOMHelpers from 'utils/DOMHelpers';
import Logger from 'utils/Logger';
import Storage from 'utils/Storage';

export default function() {
	this.global = true;
	this.state = {
		active: false,
	};
	this.elements = {};

	/**
	 * the different modules we leverage to debug stuff
	 */
	this.grid = {};

	//  this.listen = (id, payload) => { }

	this.onMount = function(component, id) {
		this.elements = DOMHelpers.getAllChildren(component);

		this.setupGrid();

		Mousetrap.bind('ctrl+alt+d', e => this.toggleUI(!this.state.active) );

		// init
		this.toggleUI( Storage.flag('debug_ui_active') );
	}

	this.toggleUI = active => {
		this.state.active = active;
		this.$('root').classList.toggle('state-debug-active', this.state.active);
		Storage.set('debug_ui_active', this.state.active);
		Logger.log('UI debugger is: ', this.state.active ? 'active' : 'deactivated');
	}
	this.toggleTool = (tool, shouldShow) => {
		const display = shouldShow ? 'block' : 'none';
		this[tool].display = shouldShow;
		this.$setProp(tool, ['display', display]);
		Storage.set(`debug_ui_tool_${tool}_display`, shouldShow);
		Logger.log('UI Tool: ', shouldShow ? 'active' : 'deactivated');
	}

	this.setupGrid = function() {
		const controls = {
			display: Storage.get('debug_ui_tool_grid_display'),
			size: Storage.get('debug_ui_tool_grid_size'),
			opacity: Storage.get('debug_ui_tool_grid_opacity'),
		};
		const toggles = {
			vertical: Storage.get('debug_ui_tool_grid_vertical'),
			horizontal: Storage.get('debug_ui_tool_grid_horizontal'),
		};

		Object.keys(controls).map(label => {
			const value = controls[label];
			this.$setProp('grid', [label, value]);
		});
		Object.keys(toggles).map(label => {
			const value = toggles[label];
			Storage.set(`debug_ui_tool_grid_${label}`, value);
			this.$('grid').classList.toggle(`state-grid-${label}`, value );
		});

		this.$('toggle-grid').addEventListener('click', e => this.toggleTool('grid', !this.grid.display) );

		this.$$('grid-control').forEach(c => c.addEventListener('change', e => this.setControl(e, 'grid')) );
	}

	this.setControl = (e, tool) => {
		const { prop, propUnit, toggle } = e.target.dataset;

		if ( typeof toggle !== 'undefined') {
			this.$(tool).classList.toggle(`state-${tool}-${prop}`, e.target.checked );
			return;
		}

		const label = prop;
		const value = propUnit
			? `${e.target.value}${propUnit}`
			: e.target.value;

		this.$setProp(tool, [label, value]);
	}

	/**
	 * DOM manipulation
	 */
	this.$setProp = (name, [label, value]) => {
		Storage.set(`debug_ui_tool_${name}_${label}`, value);

		const el = this.$(name);

		return el.style.setProperty(`--${label}`, value);
	}

	this.$ = name => {
		return this.$$(name)[0];
	}

	this.$$ = name => {
		return this.elements[name];
	}
}
