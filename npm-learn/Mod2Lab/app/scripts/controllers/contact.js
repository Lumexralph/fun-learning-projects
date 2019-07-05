angular.module('mod2LabApp')
      .controller('ContactController', function () {
        this.contactInfo = {}; 
        this.sendMessage = sendMessage; 
        
        
        function sendMessage(details) {
  
          alert(`Username: ${details.user}\n
                 Email: ${details.email}\n
                 message: ${details.message}`
                );
        
        }
      })