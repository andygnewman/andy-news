var request = require('request');

describe("Andy's first angular app Home Page", function() {

  beforeEach(function() {
    console.log(browser.baseUrl + 'test/purgeDbs');
    var jar = request.jar();
    var req = request.defaults({
      jar : jar
    });
    req.post(browser.baseUrl + 'test/purgeDbs', function(error, message) {
      console.log('Done call to testpurgeDbs');
    });
  });

  it('should have "Hello Andy!" on the page', function() {
    browser.get('#/home')
    expect(element(by.binding('test')).getText()).toBe('Hello Andy!');
  });

  it('should have posts 1 to 5 on the page', function() {
    var postsTitle = element.all(by.repeater('post in posts').column('post.title'));

    function postsTitleText() {
      return postsTitle.map(function(elm) {
        return elm.getText();
      }).
        then(function(items) {
          return items.sort();
        });
    }

    expect(postsTitleText()).toEqual(['post1', 'post2', 'post3', 'post4', 'post5']);
  });

  it('should order the posts by number of upvotes', function() {
    var postsUpvotes = element.all(by.repeater('post in posts').column('post.upvote'));

    function getUpvoteValues() {
      return postsUpvotes.map(function(elm) {
        return elm.getText();
      });
    }

    function sortedUpvoteValues() {
      return getUpvoteValues().
        then(function(items) {
          return items.sort(function(a, b){return b-a;});
        });
    }

    expect(getUpvoteValues()).toEqual(['15', '9', '5', '4', '2']);
    expect(getUpvoteValues()).toEqual(sortedUpvoteValues());
  });

  it('should be able to add a new post', function() {
    var newPost = element(by.id('new-post-title'));
    var postButton = element(by.id('add-post-button'));
    var posts = element.all(by.repeater('post in posts'));

    newPost.sendKeys('new post');
    postButton.click();

    expect(posts.count()).toBe(6);
  });

  it('should not add a new post if no post text entered', function() {
    var postButton = element(by.id('add-post-button'));
    var posts = element.all(by.repeater('post in posts'));

    postButton.click();

    expect(posts.count()).toBe(5);
  });

  it('should allow the upvotes to be incremented', function() {

    var postsUpvotes = element.all(by.repeater('post in posts').column('post.upvote'));

    function getFirstUpvoteValue() {
      return postsUpvotes.map(function(elm) {
          return elm.getText();
      }).
        then(function(upvotesArray) {
          return upvotesArray[0];
        });
    }

    function clickUpvoteButton() {
      element.all(by.repeater('post in posts')).
        then(function(posts) {
          return posts[0].element(by.css('[ng-click="incrementUpvotes(post)"]'));
        }).
        then(function(button) {
          button.click();
        });
    }

    expect(getFirstUpvoteValue()).toBe('15');
    clickUpvoteButton();
    expect(getFirstUpvoteValue()).toBe('16');

  });

  it('should display a link added to a new post', function() {

    var postTitles = element.all(by.repeater('post in posts').column('post.title'));

    element(by.id('new-post-title')).sendKeys('new post');
    element(by.id('new-post-link')).sendKeys('http://initialdigital.com');
    element(by.id('add-post-button')).click();

    function indexNewPost() {
      return postTitles.map(function(elm) {
        return elm.getText();
      }).
      then(function(titles) {
        for (var i = 0; i < titles.length; i++) {
          if (titles[i] === 'new post') {
            return i;
          }
        }
        });
    }

    indexNewPost().
    then(function(newPostIndex) {
      return element.all(by.repeater('post in posts')).get(newPostIndex);
    }).
    then(function(post) {
      return post.element(by.binding('post.link')).getText();
    }).
    then(function(postLinkText) {
      expect(postLinkText).toBe('http://initialdigital.com');
    });

  });

  it('should provide each post with a link to comments', function() {

    var postTitles = element.all(by.repeater('post in posts').column('post.title'));
    var postCommentLinks = element.all(by.repeater('post in posts').column('post.index'));

    expect(postCommentLinks.count).toEqual(postTitles.count);

  });

});
