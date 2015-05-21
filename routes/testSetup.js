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
    }
    res.json('completed');
  }

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

router.post('/populateDbs', function(req, res, next) {
  var posts = [{title: 'post1', upvotes: 5, comments: []},
                {title: 'post2', upvotes: 2, comments: []},
                {title: 'post3', upvotes: 15, comments: []},
                {title: 'post4', upvotes: 9, comments: []},
                {title: 'post5', upvotes: 4, comments: []}
              ];
  for (i = 0; i < posts.length; i++) {
    var post = new Post(posts[i]);
    post.save();
  }

  res.json('completed');

});

module.exports = router;
