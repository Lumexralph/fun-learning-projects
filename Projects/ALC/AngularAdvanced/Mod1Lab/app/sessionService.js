angular.module('app').service('sessionService', [
  '$window',
  sessionService  
]);

function sessionService($window) {
  // ng-inject will inject the $window service into our service for us to be able to use.

  this.save = save;
  this.get = get;
  this.clear = clear;

  function save(key, value) {
    $window.sessionStorage.setItem(key, value);
  }

  function get(key, value) {
    return $window.sessionStorage.getItem(key);    
  }

  function clear() {
    $window.sessionStorage.clear();
  }
    
}

// $window object provides Angular safe access to the browser's window object. Accessing the DOM directly in Angular can have negative consequences, as the changes made don't immediately get updated in Angular's $digest cycles. Because of this, many of the low-level objects such as document and window have Angular abstractions with $digest cycle management built in, such as $window and $document. These abstractions allow you to use these objects safely in Angular.