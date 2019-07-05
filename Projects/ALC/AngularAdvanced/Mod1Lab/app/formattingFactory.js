angular.module('app').factory('formattingFactory', [formattingFactory]);

function formattingFactory() {
  return {
    format
  }; 

  function format(value) {
    return value.length % 2 ? value.toLowerCase()
                            : value.toUpperCase();
  }
  
}