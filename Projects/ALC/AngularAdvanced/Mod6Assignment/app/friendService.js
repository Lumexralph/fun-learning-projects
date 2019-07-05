angular.module('app')
      .factory('friendService', [
        '$http', '$q', friendService
      ]);

function friendService($http, $q) {

  var service = {
    getFriends: getFriends
  };

  return service;

  function getFriends() {
    var deferred = $q.defer();

    $http.get('http://jsonplaceholder.typicode.com/users').then((result) => {
      // console.log(result);
      deferred.resolve(result.data);
    });

    return deferred.promise;
  }
  
}