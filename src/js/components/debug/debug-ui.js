import Mousetrap from 'mousetrap';
import Storage from 'utils/Storage';

export default function() {
	this.global = true;
	this.state = {
		active: false,
	};
	this.elements = {};

	this.onMount = function(component, id) {
		this.component = component;
		this.panels = component.querySelectorAll('[data-panel]');

		this.panels.forEach(this.installPanel);

		Mousetrap.bind('ctrl+alt+d', e => this.toggleDebug(!this.state.active) );

		this.toggleDebug( Storage.flag('debug_ui_active') );
	}

	this.toggleDebug = active => {
		this.state.active = active;
		this.component.classList.toggle('state-debug-active', this.state.active);
		Storage.set('debug_ui_active', this.state.active);
	}

	this.installPanel = panel => {
		panel.querySelectorAll('[data-control]')
			.forEach(control => this.initControl(control, panel));
	}

	this.initControl = (control, panel) => {
		const panelId = panel.dataset.panel;
		const { prop, toggle } = control.dataset;
		const savedValue = Storage.get(`debug_ui_tool_${panelId}_${prop}`);

		if (savedValue) {
			if (toggle !== undefined) {
				control.checked = (parseInt(savedValue, 10) > 0);
			} else {
				control.value = savedValue;
			}
			this.setControl(control, panel);
		}

		control.addEventListener('change', e => this.setControl(e.target, panel));
	}

	this.setControl = (control, panel) => {
		const { prop, propUnit, toggle } = control.dataset;

		return toggle !== undefined
			? this.setToggle(panel, prop, control)
			: this.setProp(panel, prop, propUnit, control);
	}

	this.setProp = (panel, prop, propUnit, control) => {
		const panelId = panel.dataset.panel;
		const value = propUnit
			? `${control.value}${propUnit}`
			: control.value;

		panel.style.setProperty(`--${prop}`, value);
		Storage.set(`debug_ui_tool_${panelId}_${prop}`, control.value); // store unitless
	}

	this.setToggle = (panel, prop, control) => {
		const panelId = panel.dataset.panel;

		panel.classList.toggle(`state-${panelId}-${prop}`, control.checked );
		Storage.set(`debug_ui_tool_${panelId}_${prop}`, control.checked);
	}
}
