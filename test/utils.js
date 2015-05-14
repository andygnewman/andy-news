'use strict';
var common = require('../common');
var configure = common.configure();
var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

beforeEach(function(done) {
  function clearDB() {
    console.log(mongoose.connection.collections.length);
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
      console.log('cleared DB ' + i);
    }
    return done();
  }

  function logArrayElements(element, index, array) {
    console.log('collection[' + index + '] = ' + element);
  }

  console.log('utils being used');

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(configure.db, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});
