'use strict';

var andyNewsAppServices = angular.module('andyNewsAppServices', []);


andyNewsAppServices.factory('postsFactory', ['$http', function($http) {
  var o = {
    posts: [
            {title: 'post1', upvotes: 5, comments: []},
            {title: 'post2', upvotes: 2, comments: []},
            {title: 'post3', upvotes: 15, comments: []},
            {title: 'post4', upvotes: 9, comments: []},
            {title: 'post5', upvotes: 4, comments: []}
    ]
  };
  o.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, o.posts);
    });
  };
  return o;
}]);
