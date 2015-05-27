'use strict';

var andyNewsAppControllers = angular.module('andyNewsAppControllers', []);

andyNewsAppControllers.controller('MainCtrl',
  ['$scope', 'postsFactory',
    function($scope, postsFactory) {
      $scope.test = "Hello Andy!";
      $scope.posts = postsFactory.posts;
      $scope.addPost = function() {
        if(!$scope.title || $scope.title === '') {return;}
        postsFactory.create({
          title: $scope.title,
          link: $scope.link,
        });
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      postsFactory.upvote(post);
    };
  }]);

andyNewsAppControllers.controller('PostsCtrl',
  ['$scope', 'postsFactory', 'post',
    function($scope, postsFactory, post) {
      $scope.post = post;
      $scope.addComment = function() {
        if($scope.body === '') { return; }
        $scope.post.comments.push({
          body: $scope.body,
          author: 'user',
          upvotes: 0
        });
        $scope.body = '';
      };
      $scope.incrementCommentUpvotes = function(comment) {
        comment.upvotes += 1;
      };
}]);
