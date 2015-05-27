var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/partials/home.ejs', function(req, res, next) {
  res.render('partials/home', { title: 'Home' });
});

router.get('/partials/posts.ejs', function(req, res, next) {
  res.render('partials/posts', { title: 'Posts' });
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if (err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.param('/post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function(err, post) {
    if (err) { return next(err); }
    if (!post) { return next(new Error('can not find post')); }
    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res, next) {

  var postToLoad = Post.findById(req.params.post);

  postToLoad.exec(function(err, post) {
    post.populate('comments', function(err, post) {
      if (err) { return next(err);}
      res.json(post);
    });
  });
});

router.put('/posts/:post/upvote', function(req, res, next) {

  var postToUpvote = Post.findById(req.params.post);

  postToUpvote.exec(function(err, post) {
    post.upvote(function(err, post) {
      if (err) { return next(err);}
      res.json(post);
    });
  });

});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment) {
    if(err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err) { return next(err); }

      res.json(comment);
    });
  });
});

router.param('/comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function(err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can not find comment')); }

    req.comment = comment;
    return next();
  });
});

module.exports = router;
