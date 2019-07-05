angular.module('app')
      .directive('author', function () {
        return {
          restrict: 'A',
          replace: false,
          scope: {
            data: '=',
            action: '&'
          },
          template: '<th>{{data.name}}</th><td>{{data.nationality}}</td><td>{{data.date}}</td><td><button class="btn btn-primary" ng-click="action()" value="Action">Details</button></td>',
          link: function (scope, element, attrs) {
            element.bind('mouseenter', () => {
                element.css('background-color', 'silver');
            });

            element.bind('mouseleave', () => {
              element.css('background-color', 'transparent');
            })
          }
        };
        
      })