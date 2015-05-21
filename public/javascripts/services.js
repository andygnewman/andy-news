'use strict';

var andyNewsAppServices = angular.module('andyNewsAppServices', []);


andyNewsAppServices.factory('postsFactory', ['$http', function($http) {
  var o = {posts: []};
  o.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      o.posts.push(data);
    });
  }
  o.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, o.posts);
    });
  };
  return o;
}]);
