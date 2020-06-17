// todo: seems very brittle, being hardcoded like that
import CONFIG from '../../../config';

export function getConfigFlag(id) {
	const flag = CONFIG.flags[id];

	return typeof flag !== 'boolean'
		? false
		: flag;
}

export function getLibraryURL(id) {
	return CONFIG.info.rootPath + '/dist/js/libs/' + id;
}

export function featureEnabled(id) {
	return this.getConfigFlag(id);
}

const ConfigManager = {
	raw: CONFIG,
	getConfigFlag,
	getLibraryURL,
	featureEnabled,
};

export default ConfigManager;
