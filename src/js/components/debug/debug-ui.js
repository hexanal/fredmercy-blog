import Mousetrap from 'mousetrap';
import Storage from 'tools/Storage';

export default function({element, messaging}) {
	const state = {
		active: false,
	};
	const panels = element.querySelectorAll('[data-panel]');

	const toggleDebug = active => {
		state.active = active;
		element.classList.toggle('state-debug-active', state.active);
		Storage.set('debug_ui_active', state.active);
		messaging.dispatch({ id: 'DEBUG_UI_TOGGLED', payload: { active } });
	}

	const installPanel = panel => {
		panel.querySelectorAll('[data-control]')
			.forEach(control => initControl(control, panel));
	}

	const initControl = (input, panel) => {
		const panelId = panel.dataset.panel;
		const { control, toggle, hotkey } = input.dataset;
		const savedValue = Storage.get(`debug_ui_tool_${panelId}_${prop}`);

		if (hotkey) { // TODO only works for toggles (checkboxes)
			Mousetrap.bind(hotkey, () => {
				input.checked = !input.checked;
				setControl(input, panel);
			});
		}
		if (savedValue) {
			if (toggle !== undefined) {
				control.checked = (parseInt(savedValue, 10) > 0);
			} else {
				control.value = savedValue;
			}
			setControl(input, panel);
		}

		control.addEventListener('change', e => setControl(e.target, panel));
	}

	const setControl = (input, panel) => {
		const { control, propUnit, toggle } = input.dataset;
		return toggle !== undefined
			? setToggle(panel, control, input)
			: setProp(panel, control, propUnit, input);
	}

	const setProp = (panel, control, propUnit, input) => {
		const panelId = panel.dataset.panel;
		const value = propUnit
			? `${input.value}${propUnit}`
			: input.value;

		panel.style.setProperty(`--${control}`, value);
		Storage.set(`debug_ui_tool_${panelId}_${prop}`, input.value); // store unitless
		messaging.dispatch({ id: 'DEBUG_PROP_WAS_SET', payload: { control, value, input } });
	}

	const setToggle = (panel, control, input) => {
		const panelId = panel.dataset.panel;

		panel.classList.toggle(`state-${panelId}-${control}`, input.checked );
		Storage.set(`debug_ui_tool_${panelId}_${control}`, input.checked);
		messaging.dispatch({ id: 'DEBUG_TOGGLE_WAS_SET', payload: { control, value: input.checked, control } });
	}

	// ignition!
	panels.forEach(installPanel);
	// Mousetrap.bind('ctrl+alt+d', () => toggleDebug(!state.active) );
	Mousetrap.bind('d e b u g', () => toggleDebug(!state.active) );
	toggleDebug( Storage.flag('debug_ui_active') );
}
