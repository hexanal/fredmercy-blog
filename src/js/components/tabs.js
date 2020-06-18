export default function({element, control, ui, messaging}) {
	const id = element.dataset.componentId;

	const switchTab = ({target}) => {
		const { tabId } = target.dataset;

		control['tab-trigger'].map(trigger => trigger.classList.remove('state-tab-active') );
		target.classList.add('state-tab-active'); // active state on tab trigger

		ui['tab'].map(tab => tab.classList.toggle('state-tab-active', tabId === tab.dataset.tabId) ); // setting tabs' active state

		messaging.dispatch({
			id: 'TABS_SWITCHED',
			payload: {
				origin: {
					id,
					element
				},
				tabId
			}
		});
	};

	control['tab-trigger'].map(trigger => trigger.addEventListener('click', switchTab) );
}
