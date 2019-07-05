angular.module('app', ['ngRoute']);

angular.module('app')
    .config([
      '$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
              templateUrl: '/app/views/home/index.html',
              controller: 'HomeController',
              controllerAs: 'vm'
            })
            .when('/about', {
              templateUrl: '/app/views/about/index.html',
              controller: 'AboutController',
              controllerAs: 'vm'
            })
        
      }
    ]);
