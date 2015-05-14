var andyNewsApp = angular.module('andyNewsApp', [
  'ui.router',
  'andyNewsAppControllers',
  'andyNewsAppFilters',
  'andyNewsAppServices'
  ]);

andyNewsApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouteProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'partials/home.ejs',
          controller: 'MainCtrl',
          resolve: {
            postPromise: ['postsFactory', function(postsFactory) {
              return postsFactory.getAll();
            }]
          }
        })
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: 'partials/posts.ejs',
          controller: 'PostsCtrl'
        });

      $urlRouteProvider.otherwise('home');
}]);
