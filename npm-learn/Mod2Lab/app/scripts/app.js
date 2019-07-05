'use strict';

/**
 * @ngdoc overview
 * @name mod2LabApp
 * @description
 * # mod2LabApp
 *
 * Main module of the application.
 */
angular
  .module('mod2LabApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
  ])
  .controller('AppController', ['$scope', function ($scope) {
    $scope.currentYear = new Date().getFullYear();
    
  }])
  .config(['$routeProvider', '$locationProvider', 
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/shopping/', {
        templateUrl: 'views/shop.html',
        controller: 'ShopController',
        controllerAs: 'shop'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductController',
        controllerAs: 'prod'

      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
