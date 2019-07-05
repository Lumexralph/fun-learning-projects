angular.module('app')
      .directive('person', function () {
        return {
          restrict: 'E',
          template: 'Name: <input type="text" ng-model="person.name" class="form-control" />' +
                    'Pen Name: <input type="text" ng-model="person.penName" class="form-control" />' +
                    '<input type="button" ng-click="action()" value="Action" class="btn btn-primary"/>' + 
                    '<pre>{{person | json}}</pre>',
          scope: {
            person: '=',
            action: '&'
          }          

        };        
      });