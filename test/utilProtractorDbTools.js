var request = require('request');

beforeEach(function() {

  function post(url) {
    var defer = protractor.promise.defer();
    request.post(browser.baseUrl + url, function(error, message) {
      console.log('Done call to', url);
      if (error || message.statusCode >= 400) {
        defer.reject({
          error : error,
          message : message
        });
      } else {
        defer.fulfill(message);
      }
    });
    return defer.promise;
  }

  function purge() {
    return post('test_setup/purgeDbs');
  }

  function populate() {
    return post('test_setup/populateDbs');
  }

  function getHomePage() {
    return browser.get('#/home');
  }

  var flow = protractor.promise.controlFlow();
  flow.execute(purge);
  flow.execute(populate);
  flow.execute(getHomePage);
});
