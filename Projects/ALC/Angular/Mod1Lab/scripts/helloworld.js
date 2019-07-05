        // the empty array represented by [], is where you would
        //  define any other Angular modules that your app may 
        // depend on (for example, ng-animate, ng-touch)

        var homeWorkApp = angular.module('homeWorkApp', []);  

         // declare a constant
        // At this point, we have created our own dependency - now it's time to use it. In order to do so, we need to tell the controller that this particular dependency is needed for the logic within the controller to function. By adding it to the list of dependencies, Angular will make it available to the controller automatically when the controller is invoked. This is what Dependency Injection is all about. 

        homeWorkApp.constant('currentDate', `The Current Date is: "${(new Date()).toLocaleDateString}"`);

        // declare controller and attach it to the module/app 

        homeWorkApp.controller('firstController', ['$scope', 'currentDate',
                    function ($scope, currentDate) {
                        $scope.title = 'Module 1 Homework';
                        $scope.date = currentDate;
                    }
                ]);
                
       
