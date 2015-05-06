describe('AndyNews Factories', function() {

  describe('posts', function() {
    var factory;

    beforeEach(angular.mock.module('andyNewsAppServices'));

    beforeEach(angular.mock.inject(function(postsFactory) {
      factory = postsFactory;
    }));

    it('should create "posts" with 5 posts in it', function() {
      expect(factory.posts.length).toBe(5);
    });

  });

});
