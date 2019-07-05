// string names of components are listed as the first items in the array, and then the final item in the array is the actual function of the controller, with parameters matching each of the noted dependencies.

angular.module('app').controller('sessionController', ['sessionService',
  'sessionFactory', sessionController]);

function sessionController(sessionService, sessionFactory) {
  // Instantiate the Factory object by using the new keyword and binding it to a variable in your controller

  var mySessionFactory = sessionFactory;

  var vm = this;

  vm.getFactorySession = getFactorySession;
  vm.setFactorySession = setFactorySession;
  vm.clearFactorySession = clearFactorySession;

  function getFactorySession() {
    vm.model = {
      name: mySessionFactory.get('name'),
      nickname: mySessionFactory.get('nickname'),
      status: `Retrieved by Factory on ${new Date()}`
    };    
  }

  function setFactorySession() {
    mySessionFactory.save('name', vm.model.name);
    mySessionFactory.save('nickname', vm.model.nickname);
    getFactorySession();
  }

  function clearFactorySession() {
    mySessionFactory.clear();
    getFactorySession();
  }

  vm.getServiceSession = function () {
    // Note that we have used sessionService here as a variable, having injected it into the controller by listing it as a dependency. We can then call the get method from the service that we declared earlier.

    vm.model = {
      name: sessionService.get('name'),
      nickname: sessionService.get('nickname'),
      status: `Retrieved by service on ${new Date()}`
    };   

  }
  vm.setServiceSession = function () {
    sessionService.save('name', vm.model.name);
    sessionService.save('nickname', vm.model.nickname);
    vm.getServiceSession();
  }
  vm.clearServiceSession = function () {
    sessionService.clear();
    vm.getServiceSession();    
  }
}