import ConfigManager from 'utils/ConfigManager';

export function log(msg) {
	if ( !ConfigManager.featureEnabled('logger') ) return;

	Components.broadcast('LOG', msg);

	const time = new Date.getTime();
	console.info(`(@${time}) — ${msg}`);
}

const Logger = {
	log,
}

export default Logger;
