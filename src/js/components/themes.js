import Storage from 'tools/Storage';

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

export default function({control, messaging}) {
	const state = {
		selectedTheme: DEFAULT_THEME,
		custom: {...DEFAULT_CUSTOM_COLORS}, // TODO grab those from the actual CSS
	};

	const useTheme = function(themeId) {
		state.selectedTheme = themeId;
		Storage.set('selected_theme', themeId);
		document.documentElement.dataset.theme = themeId;

		toggleCustomTheme(themeId);
	}

	const setupTheme = function() {
		const stored = Storage.get('selected_theme');
		const hasSavedTheme = THEME_LIST.includes( stored );

		if (hasSavedTheme) {
			messaging.dispatch({ id: 'SET_THEME_VALUE', payload: stored });
			useTheme(stored);
		}
	}

	const toggleCustomTheme = function(themeId) {
		if (themeId !== 'custom') {
			Object.keys(DEFAULT_CUSTOM_COLORS).map(colorId => {
				document.documentElement.style.removeProperty(`--color-${colorId}`);
			});
		} else {
			populateCustomColorFromStorage();
		}
	}

	const changeCustomColor = (picker, control) => {
		const { value } = picker;
		const { colorId } = control.dataset;
		const colorLabel = control.querySelector('[data-js="color-value"]');

		Storage.set(`theme_custom_color_${colorId}`, value);
		document.documentElement.style.setProperty(`--color-${colorId}`, value);
		colorLabel.innerHTML = value;
	}

	const populateCustomColorFromStorage = function() {
		control['color-picker'].map(picker => {
			const { colorId } = picker.dataset;
			const stored = Storage.get(`theme_custom_color_${colorId}`);
			const color = stored ? stored : DEFAULT_CUSTOM_COLORS[colorId];

			picker.value = color;
			state.custom[colorId] = color;
			changeCustomColor(picker, picker.parentElement.parentElement); // TODO not fond of .parentElement.parentElement here
		});
	};

	const openThemeEditor = function() {
		document.documentElement.classList.add('state-theme-edit');
		control['color-picker'][0].focus();
	};

	control['close'].addEventListener('click', () => {
		document.documentElement.classList.remove('state-theme-edit');
	});
	control['color-picker'].map(colorPicker => {
		colorPicker.addEventListener('change', e => {
			changeCustomColor(e.target, control);
		});
	});

	messaging.subscribe('SWITCH_THEME', useTheme);
	messaging.subscribe('OPEN_THEME_EDITOR', openThemeEditor);

	setupTheme();

	return function() {
		messaging.unsubscribe('SWITCH_THEME', useTheme);
		messaging.unsubscribe('OPEN_THEME_EDITOR', openThemeEditor);
	}
}
