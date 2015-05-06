exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'e2e/*.js'
  ],

  allScriptsTimeout: 11000,

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
