app.controller('menuController', ['$scope',
      function ($scope) {
        $scope.model = {title: 'Our Menu'};
        
        $scope.changeMainDish = function (item, price) {
          $scope.model.mainDish = {
            item,
            price
          };
        }

        $scope.$watch('model.mainDish', function (newValue, oldValue) {
          if (newValue === 'BBQ Chicken Pizza') {
            alert(`You have selected ${newValue}`)
          }
          
        })
        // end of scope
      }    
  ])