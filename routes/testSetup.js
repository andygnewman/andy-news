var express = require('express');
var router = express.Router();

var common = require('../common');
var configure = common.configure();
var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.post('/purgeDbs', function(req, res, next) {
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
      console.log('cleared DB ' + i);
    }
    return next();
  }

  console.log('purgeDbs being used');

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

module.exports = router;
