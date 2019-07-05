angular.module('app')
      .directive('friendDirective', function () {
        return {
          restrict: 'E',
          scope: {
            list: '='
          },
          templateUrl: 'app/friends.display.template.html'
        }
        
      });