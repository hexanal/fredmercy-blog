const Components = {
	library: [],
	globals: [],
	mounted: [],

	broadcast(id, payload) {
		const allComponents = [...this.globals, ...this.mounted];

		allComponents.map(Component => {
			if (typeof Component.listen !== "function") return;
			Component.listen(id, payload);
		});
	},

	register(id, Component) {
		this.library.push({ id, Component });
	},

	autoMount(id, Component) {
		this.register(id, Component);
		const Instance = new Component;
		Instance.onMount(document, id);
		this.mounted.push(Instance);
	},

	mountAllInsideContainer(container) {
		const mountable = container.querySelectorAll(`[data-component]`);

		if (!mountable) return; // no component

		mountable.forEach((el, index) => {
			const Component = this.getComponentForElement(el);
			if (!Component || typeof Component.onMount !== "function") return;
			Component.onMount(el, index);

			if (Component.global && !this.globals.includes(Component)) {
				return this.globals.push(Component);
			}

			this.mounted.push(Component);
		});
	},

	getComponentForElement(el) {
		const type = el.dataset.component;
		const match = this.library.find(({ id }) => id === type);

		if (!match) return false;

		const Component = new match.Component();

		return Component;
	},

	flush() {
		this.mounted.map(Component => {
			if (typeof Component.onUnmount !== "function") return;
			Component.onUnmount();
		});
		this.mounted = [];
	},

	start() {
		this.mountAllInsideContainer(document);
	},
};

export default Components;
