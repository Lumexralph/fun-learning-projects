angular.module('mod2LabApp')
      .factory('MainService', ['$http', '$q', mainService]);

function mainService($http, $q) {
  
  var service = {
    message: getMessage
  }

  return service;

  function getMessage() {
    var deferred = $q.defer();

    $http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').then((result) => deferred.resolve(result));

    return deferred.promise;
    
  }


}