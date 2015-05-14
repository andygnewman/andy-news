module.exports = function(config) {
  config.set({

    // autoWatch : false,

    basePath : '../',

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'public/javascripts/**/*.js',
      'test/unit/angular/**/*.js'
    ],

    // browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]
  });
};
