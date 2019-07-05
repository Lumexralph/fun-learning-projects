angular.module('app')
    .controller('ContactUsController', [
      function () {
        var vm =  this;
        this.contact = contact;

        function contact() {
          alert('message sent');
        }
      }
    ]);