import CONFIG from '../../../config';

const ConfigManager = {
	raw: CONFIG,

	getConfigFlag(id) {
		const flag = CONFIG.flags[id];

		return typeof flag !== 'boolean'
			? false
			: flag;
	},

	getLibraryURL(id) {
		return CONFIG.info.rootPath + '/dist/js/libs/' + id;
	},

	featureEnabled(id) {
		return this.getConfigFlag(id);
	}
};

export default ConfigManager;
