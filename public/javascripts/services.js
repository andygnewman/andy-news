'use strict';

var andyNewsAppServices = angular.module('andyNewsAppServices', []);


andyNewsAppServices.factory('postsFactory', ['$http', function($http) {
  var o = {posts: []};
  o.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      o.posts.push(data);
    });
  };
  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function(data) {
        post.upvotes += 1;
      });
  };
  o.getOne = function(id) {
    return $http.get('/posts/' + id).then(function(res) {
      console.log('res.data', res.data);
      return res.data;
    });
  };
  o.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, o.posts);
    });
  };

  return o;
}]);
