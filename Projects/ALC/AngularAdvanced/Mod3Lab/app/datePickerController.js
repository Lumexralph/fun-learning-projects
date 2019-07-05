angular.module('app')
    .controller('DatePickerController', ['$scope', datePickerController]);

function datePickerController($scope) {
    
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();
  
    $scope.clear = function() {
      $scope.dt = null;
    };
  
    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: false
    };
  
    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
     
    // prevent date picked to not be beyond present day
    $scope.toggleMin = function() {
      $scope.options.minDate = new Date();
    };
  
    $scope.toggleMin();
  
    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };
  
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
  
    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
  
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
  
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
  
      return '';
    }
    
    
}