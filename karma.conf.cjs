module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'src/**/*.jsx',
			'test/**/*.jsx'
		],
		browsers: ['Firefox', 'ChromeHeadless'],
		plugins: ['Karma-jasmine', 'Karma-chrome-launcher','Karma-launcher-firefox'],
		singleRun: true,
		reporters: ['progress', 'coverage'],
		preprocessors: 	{

			'src/**/*.jsx':['coverage'],
		},
		coverageReporter: {
      		type: 'html',
			dir: 'coverage/',
		},
	});
};
