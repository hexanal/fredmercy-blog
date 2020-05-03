import('/blog/dist/core/Exponent.js')
	.then(module => {
		const Exponent = module.default;
		Exponent(document);
	});
