const THEME_LIST = [
	'june',
	'high-contrast',
	'black-and-white',
	'dark-mode',
];
const DEFAULT_THEME = 'june';

export default function() {
	this.autoMount = true;
	this.global = true;

	this.state = {
		selectedTheme: DEFAULT_THEME,
		switchThemeSelect: null,
		storage: window.localStorage,
	};

	this.onMount = function(component, id) {
		this.state.switchThemeSelect = component.querySelector('[data-js="theme-select"]');
		this.state.switchThemeSelect.addEventListener('change', e => {
			const themeId = e.target.value;
			this.useTheme(themeId);
		});

		this.setupTheme();
	}

	this.listen = function(id, payload) {
		if (id === 'SWITCH_THEME') {
			this.useTheme(payload);
		}
	}

	this.useTheme = function(themeId) {
		this.state.selectedTheme = themeId;
		this.state.storage.setItem('selected_theme', themeId);
		document.documentElement.dataset.theme = themeId;
	}

	this.setupTheme = function() {
		const stored = this.state.storage.getItem('selected_theme');
		const hasSavedTheme = THEME_LIST.includes( stored );

		if (hasSavedTheme) {
			this.state.switchThemeSelect.value = stored;
			this.useTheme(stored);
		}
	}
}
