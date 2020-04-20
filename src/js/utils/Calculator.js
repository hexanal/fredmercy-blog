const Calculator = {
	clamp: function(min, max, value) {
		return Math.min(max, Math.max(min, value));
	},

	getProbabilityOutcome: function(probability) {
		return probability > Math.random();
	},

	getRandomInt: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	},

	round: function(val, scale = 5) {
		const decimals = Math.pow(10, scale);
		return Math.round((val + Number.EPSILON) * decimals) / decimals;
	}
};

export default Calculator;
