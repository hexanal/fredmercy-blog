import Storage from 'tools/Storage';

const THEME_LIST = [
	'june',
	'high-contrast',
	'black-and-white',
	'dark-mode',
	'xmas',
	'tron',
];
const DEFAULT_THEME = 'june';

export default function({messaging}) {
	const state = {
		selectedTheme: DEFAULT_THEME
	};

	const useTheme = function(themeId) {
		state.selectedTheme = themeId;
		Storage.set('selected_theme', themeId);
		document.documentElement.dataset.theme = themeId;
	}

	const setupTheme = function() {
		const stored = Storage.get('selected_theme');
		const hasSavedTheme = THEME_LIST.includes( stored );

		if (hasSavedTheme) {
			messaging.dispatch({ id: 'SET_THEME_VALUE', payload: stored });
			useTheme(stored);
		}
	}

	messaging.subscribe('SWITCH_THEME', useTheme);

	setupTheme();

	return function() {
		messaging.unsubscribe('SWITCH_THEME', useTheme);
	}
}
