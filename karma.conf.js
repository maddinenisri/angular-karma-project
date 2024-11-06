module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        // require('karma-chrome-launcher'),
        require('karma-firefox-launcher'),
        require('karma-coverage-istanbul-reporter'),
        require('karma-jasmine-html-reporter'),
        // require('karma-coverage-threshold'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false
      },
      coverageIstanbulReporter: {
        dir: './coverage/azure-devops',
        reports: ['lcovonly'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      singleRun: false,
      browserNoActivityTimeout: 60000
    });
  };
