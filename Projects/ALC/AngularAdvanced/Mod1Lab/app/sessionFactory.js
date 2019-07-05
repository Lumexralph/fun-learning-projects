angular.module('app').factory('sessionFactory', ['$window', 'formattingFactory', sessionFactory]
            );

// Notice that just like services and controllers, you can use ng-inject to inject components into your factory. Note also that there is a return statement for the factory. Factories require a return statement, as they are essentially building an object to be output.

function sessionFactory($window, formattingFactory) {
  return {
    save: save,
    get: get,
    clear: clear
  };

  function save(key, value) {
    value = formattingFactory.format(value);
    $window.sessionStorage.setItem(key, value);      
  }

  function get(key) {
    return $window.sessionStorage.getItem(key);    
  }

  function clear() {
    $window.sessionStorage.clear();
  }

}