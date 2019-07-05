angular.module('app', ['ngRoute']);

angular.module('app')
    .config([
      '$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        // This code is declaring a route for an items route in our website. Angular will listen for a URL of http://localhost:2319/items/. When that route is encountered, it will load the HTML file in the path /app/items/index.html. Then the ItemsController will be used for that HTML snippet. The last piece is the controllerAs. This is declaring a prefix of vm to be used in our view, just as with previous labs.

        $routeProvider
              .when('/items/', {
                templateUrl: '/app/items/index.html',
                controller: 'ItemsController',
                controllerAs: 'vm'
              })
              .when('/', {
                templateUrl: '/app/home/index.html',
                controller: 'HomeController',
                controllerAs: 'vm'
              })
              .when('/contactUs/', {
                templateUrl: '/app/contactUs/index.html',
                controller: 'ContactUsController',
                controllerAs: 'vm'
              })

              // This is an all-inclusive route that will use the HomeController and associated HTML fragment.
              .otherwise({
                redirectTo: '/'
              })
      }
    ]);