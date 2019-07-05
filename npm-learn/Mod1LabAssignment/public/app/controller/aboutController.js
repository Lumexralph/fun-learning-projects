angular.module('app')
    .controller('AboutController', [
      function () {
        var vm = this;
        vm.message = 'This is the about page';
      }
    ])