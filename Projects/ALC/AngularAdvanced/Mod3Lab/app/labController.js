angular.module('app')
    .controller('labController', [
      function () {
        var vm = this; 
        vm.alerts = []; 
        
        vm.addWarning = addWarning;
        vm.addDanger = addDanger;
        vm.dismissAlert = dismissAlert;

        function addWarning() {
          addAlert('warning', 'Warning! Warning!! 2 kids in trouble!!');
        }

        function addDanger() {
          addAlert('danger', 'Danger, Ralp! Danger!! ');          
        }

        function dismissAlert(index) {
          vm.alerts.splice(index, 1);
        }

        function addAlert(type, text) {
          vm.alerts.push({type, text})
        }
      }
    ]);