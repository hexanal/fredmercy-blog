const THEME_LIST = [
	'june',
	'high-contrast',
	'black-and-white',
	'dark-mode',
	'xmas',
	'tron',
	'custom',
];
const DEFAULT_THEME = 'june';
const DEFAULT_CUSTOM_COLORS = {
	bg: '#ffffff',
	primary: '#000000',
	secondary: '#000000',
	active: '#000000',
	subdued: '#000000',
	extra: '#000000'
};

export default function() {
	this.global = true;
	this.state = {
		selectedTheme: DEFAULT_THEME,
		switchThemeSelect: null,
		storage: window.localStorage,
		customColorPanel: null,
		customColorPanelCloseBtn: null,
		customColorControls: null,
		custom: {...DEFAULT_CUSTOM_COLORS},
		pickers: []
	};

	this.onMount = function(component) {
		this.state.switchThemeSelect = component.querySelector('[data-js="theme-select"]');
		this.state.switchThemeSelect.addEventListener('change', e => {
			const themeId = e.target.value;
			this.useTheme(themeId);
		});

		this.state.customColorPanelCloseBtn = document.querySelector('[data-js="custom-theme-close"]');
		this.state.customColorPanelCloseBtn.addEventListener('click', e => {
			this.closeThemeEditor();
		});
		this.state.customColorPanel = document.querySelector('[data-js="custom-theme-panel"]');
		this.state.customColorControls = document.querySelectorAll('[data-js="custom-theme-control"]');
		this.state.customColorControls.forEach(control => {
			const picker = control.querySelector('[data-js="color-picker"]');

			this.state.pickers.push(picker);

			picker.addEventListener('change', e => {
				this.changeCustomColor(e.target, control);
			});
		});

		this.setupTheme();
	}

	this.listen = function(id, payload) {
		if (id === 'SWITCH_THEME') {
			this.useTheme(payload);
		}
		if (id === 'OPEN_THEME_EDITOR') {
			this.openThemeEditor();
		}
	}

	this.openThemeEditor = function() {
		document.documentElement.classList.add('state-theme-edit');
		this.state.pickers[0].focus();
	}

	this.closeThemeEditor = function() {
		document.documentElement.classList.remove('state-theme-edit');
	}

	this.useTheme = function(themeId) {
		this.state.selectedTheme = themeId;
		this.state.storage.setItem('selected_theme', themeId);
		document.documentElement.dataset.theme = themeId;

		this.toggleCustomTheme(themeId);
	}

	this.setupTheme = function() {
		const stored = this.state.storage.getItem('selected_theme');
		const hasSavedTheme = THEME_LIST.includes( stored );

		if (hasSavedTheme) {
			this.state.switchThemeSelect.value = stored;
			this.useTheme(stored);
		}
	}

	this.toggleCustomTheme = function(themeId) {
		if (themeId !== 'custom') {
			Object.keys(DEFAULT_CUSTOM_COLORS).map(colorId => {
				document.documentElement.style.removeProperty(`--color-${colorId}`);
			});
		} else {
			this.populateCustomColorFromStorage();
		}
	}

	this.changeCustomColor = (picker, control) => {
		const { value } = picker;
		const { colorId } = control.dataset;
		const colorLabel = control.querySelector('[data-js="color-value"]');

		this.state.storage.setItem(`theme_custom_color_${colorId}`, value);
		document.documentElement.style.setProperty(`--color-${colorId}`, value);
		colorLabel.innerHTML = value;
	}

	this.populateCustomColorFromStorage = function() {
		const { storage, pickers } = this.state;

		pickers.forEach(picker => {
			const { colorId } = picker.dataset;
			const stored = storage.getItem(`theme_custom_color_${colorId}`);
			const color = stored ? stored : DEFAULT_CUSTOM_COLORS[colorId];

			picker.value = color;
			this.state.custom[colorId] = color;
			this.changeCustomColor(picker, picker.parentElement.parentElement);
		});
	}
}
