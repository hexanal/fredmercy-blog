// todo: allow default settings that can be overridden
// import ConfigManager from 'utils/ConfigManager';
// const SETTINGS = ConfigManager.getExponentSettings();
// const settings = { // 	...SETTINGS // }

const settings = {
	componentFileExtension: 'js',
	componentSelector: '[data-component]',
	componentUIChildrenSelector: '[data-ui]',
	componentControlChildrenSelector: '[data-control]',
	componentsLocation: '/blog/dist/components', // todo: get path from config file
};

const mounted = [];

function mountAllComponentsOnElement(mountElement) {
	const components = mountElement.querySelectorAll(settings.componentSelector);
	console.log('Found components: ', components);

	components.forEach(component => {
		const componentId = component.dataset.component;
		const componentPath = `${settings.componentsLocation}/${componentId}/${componentId}.${settings.componentFileExtension}`;

		console.log(`Attempting loading of component "${componentId}" (located at ${componentPath})...`);

		import(componentPath)
			.then(module => {

				console.log(module);

				if (!module) return;
				const Component = module.default;

				Component.ui = component.querySelectorAll(settings.componentUIChildrenSelector);
				Component.controls = component.querySelectorAll(settings.componentControlChildrenSelector);

				const componentInstance = new Component(component);

				componentInstance.onMount();

				mounted.push({
					id: componentId,
					component: componentInstance
				});

				console.log('[Exponent] Loaded component: ', componentId);
			})
			// .catch(err => {
			// 	console.info(`Warning: no component "${componentId}" was found at: ${componentPath}.`);
			// });
	});
}

function Exponent(mountElement) {
	console.log('[Exponent] Mount Exponent on element :', mountElement);

	mountAllComponentsOnElement(mountElement);
};

export class Component {

}

export default Exponent;
