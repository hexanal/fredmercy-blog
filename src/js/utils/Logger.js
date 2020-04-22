import Config from 'utils/Config';
// import Components from 'core/Components';

const Logger = {
	log: function(msg) {
		if ( !Config.featureEnabled('logger') ) return;

		Components.broadcast('LOG', msg);

		const time = new Date.getTime();
		console.info(`(@${time}) — ${msg}`);
	}
}

export default Logger;
