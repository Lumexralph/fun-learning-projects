angular.module('app')
    .directive('h3MessageDirective', function () {
        return {
          restrict: 'EA',
          replace: true,
          template: '<h3>{{title}}</h3>',
          scope: {
            // This sets up a local scope within the Directive, and indicates that you want to pass the value title into the directive by means of an attribute. The '@' character tells the Directive that the binding will be one-way, meaning the value can be passed into the Directive, but changes to the value will not reflect in the parent controller if the value passed is a variable.
            title: '@'
          },
          link: function (scope, element, attrs) {
            element.bind('mouseenter', function () {
              element.css('background-color', 'red');              
            });
            
            element.bind('mouseleave', function () {
              element.css('background-color', 'silver');
            });
          }

        };
    })