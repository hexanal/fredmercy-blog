const Storage = {
	switch: id => {
		const flag = !this.flag(id);
		this.set(id, flag);

		return flag;
	},

	flag: id => (window.localStorage.getItem(id) > 0),

	set: (id, value) => {
		const isBool = typeof value === 'boolean';
		const valueToSet = isBool ? this.boolToBinaryFlag(value) : value;

		window.localStorage.setItem(id, valueToSet);
	},

	get: id => window.localStorage.getItem(id),

	boolToBinaryFlag: val => {
		return val ? 1 : 0;
	}
};

export default Storage;
