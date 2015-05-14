'use strict';

var utils = require('../../utils');
var should = require('should');
var mongoose = require('mongoose');

var Comment = require('../../../models/Comments').Comment;

describe('Comments: models', function() {

  describe('Create a comment', function() {

    it('should create a new Comment', function(done) {

      var commentExample = {
        body: 'This is a great post'
      };

      Comment.create(commentExample, function(err, createdComment) {
        should.not.exist(err);
        createdComment.body.should.equal('This is a great post');
        done();
      });

    });

  });

  describe('Upvote a comment', function() {

    it('should upvote a comment', function(done) {

      var commentExample = {
        body: 'This is a great post'
      };

      Comment.create(commentExample, function(err, createdComment) {
        createdComment.upvotes.should.equal(0);
        createdComment.upvote(function() {
          createdComment.upvotes.should.equal(1);
        });
        done();
      });

    });
  });

});
