module.exports = {
	webpack: function (config) {
		config.module.rules[0].test = /\.(js|jsx)$/;

		config.module.rules[0].use.options.presets.push([
			"@babel/preset-react",
			{
				"runtime": "automatic"
			}
		]);

		config.resolve.extensions.push('.jsx');

		return config;
	},
	postcss: function (plugins) {
		return [
			...plugins
		];
	}
};
