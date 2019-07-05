angular.module('app')
  .controller('labController', [
    function () {
      var vm =  this;

      vm.person = {
        name: 'Ogundele Olumide',
        penName: 'LumexRalph'
      };

      vm.show = function () {
        alert(JSON.stringify(vm.person));
      }

            
    }

  ]);