'use strict';

var utils = require('../../utils');
var should = require('should');

var Post = require('../../../models/Posts').Post;

describe('Posts: models', function() {

  describe('Create a post', function() {

    it('should create a new Post', function(done) {

      var postExample = {
        title: 'Initial Digital',
        link: 'https://initialdigital.com'
      };

      Post.create(postExample, function(err, createdPost) {
        should.not.exist(err);
        createdPost.title.should.equal('Initial Digital');
        createdPost.link.should.equal('https://initialdigital.com');
        done();
      });
    });
  });

});
