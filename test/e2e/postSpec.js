var utils = require('../utilProtractorDbTools');

describe("Andy's first angular app - Posts Page", function() {

  describe("navigating to the post page", function() {

    it('should navigate to a specific post page when click comments', function() {
      browser.get('#/home');
      var firstPost = element.all(by.repeater('post in posts')).first();
      var firstPostLink = firstPost.element(by.css('.link-to-post'));
      var firstPostTitle = firstPost.element(by.binding('post.title')).getText();

      firstPostLink.click()
        .then(function() {
          expect(element(by.binding('post.title')).getText()).toEqual(firstPostTitle);
      });

    });

  });

  describe("posts page", function() {

    beforeEach(function() {
      browser.get('#/home');
      var firstPost = element.all(by.repeater('post in posts')).first();
      var firstPostLink = firstPost.element(by.css('.link-to-post'));
      firstPostLink.getAttribute('href').then(function(attr) {
          browser.get(attr);
          element(by.model('body')).sendKeys('great post');
          element(by.id('post-comment-button')).click();
      });
    });

    it('should allow a new comment to be added', function() {
      var comments = element.all(by.repeater('comment in post.comments'));

      expect(comments.count()).toBe(1);
    });

    it('should allow comment upvotes to be incremented', function() {

      var commentUpvotes = element.all(
        by.repeater('comment in post.comments').column('comment.upvotes'));

      function getFirstUpvoteValue() {
        return commentUpvotes.map(function(elm) {
            return elm.getText();
        }).
          then(function(upvotesArray) {
            return upvotesArray[0];
          });
      }

      function clickUpvoteButton() {
        element.all(by.repeater('comment in post.comments')).
          then(function(comments) {
            return comments[0]
              .element(by.css('[ng-click="incrementCommentUpvotes(comment)"]'));
          }).
          then(function(button) {
            button.click();
          });
      }

      expect(getFirstUpvoteValue()).toBe('0');
      clickUpvoteButton();
      expect(getFirstUpvoteValue()).toBe('1');
    });

  });

});
