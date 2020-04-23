// import Mousetrap from 'mousetrap';

export default function() {
	this.global = true;
	this.state = {
		activeTab: null,
		component: null,
		tabList: null,
		tabTriggers: null,
		tabsContainer: null,
		tabs: null,
	};

	this.onMount = function(component) {
		this.state.component = component;
		this.state.tabList = component.querySelector('[data-js="tab-list"]');
		this.state.tabTriggers = component.querySelectorAll('[data-js="tab-trigger"]');
		this.state.tabsContainer = component.querySelector('[data-js="tab-sections"]');
		this.state.tabs = component.querySelectorAll('[data-tab]', component);

		this.state.tabTriggers.forEach(t => t.addEventListener('click', this.switchTab) );

		// Mousetrap(this.state.tabList).bind('h', e => console.log(e, 'left') )
		// Mousetrap(this.state.tabList).bind('j', e => console.log(e, 'up') )
		// Mousetrap(this.state.tabList).bind('k', e => console.log(e, 'down') )
		// Mousetrap(this.state.tabList).bind('l', e => console.log(e, 'right') );
	}

	this.switchTab = ({target}) => {
		const { tabId } = target.dataset;

		this.state.tabTriggers.forEach(t => t.classList.remove('state-tab-active') );
		this.state.tabs.forEach(t => t.classList.remove('state-tab-active') );

		this.state.tabsContainer
			.querySelector(`[data-tab="${tabId}"]`)
				.classList.add('state-tab-active');
		target.classList.add('state-tab-active');
	}

}
