import ConfigManager from 'utils/ConfigManager';
// import Components from 'core/Components';

const Logger = {
	log: function(msg) {
		if ( !ConfigManager.featureEnabled('logger') ) return;

		Components.broadcast('LOG', msg);

		const time = new Date.getTime();
		console.info(`(@${time}) — ${msg}`);
	}
}

export default Logger;
