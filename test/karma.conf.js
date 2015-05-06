module.exports = function(config) {
  config.set({

    autoWatch : true,

    basePath : '../',

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]
  });
};
