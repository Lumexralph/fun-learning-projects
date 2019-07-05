// Its generally a good practice when working with $scope variables to have a default value for them if their only value gets set by the user's input. This prevents issues with the values evaluating to undefined. 

app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        $scope.model = {
            number: 0,
            result: 'Ready',
            buttonClicked: false
        };

        $scope.checkOddNumber = checkOddNumber;

        $scope.getRepos = getRepos;  // get repos

        $scope.loadDetail = loadDetail;

        function getRepos(org) {
            
            $scope.model.repos = gitHub.getAll({org: org}, function(data) {
                // success handler
                return data;
            }, function (data) {
                // error handler
                $scope.model.repos = {
                    message: data.statusText,
                    status: data.status
                };

            });

            // $http.get('https://api.github.com/orgs/angular/repos')
            //      .then((response) => $scope.model.repos = response.data,
            //            (response) => $scope.model.repos = `Error: ${response.data.message}`);
        }

        function loadDetail(name, org) {
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail({ id: name, org: org });
            // var url = `https://api.github.com/repos/angular/${name}`;
            // $http.get(url)
            //      .then((response) => $scope.model.detail = response.data,
            //            (response) => $scope.model.detail = {
            //                error: true,
            //                message: `Error: ${response.data.message}`

            //            });
        }

        function checkOddNumber(input) {
            $scope.model.result = 'Working.....';
            checkOddNumberHandler(input).then((result) => {
                $scope.model.result = `Success: ${result}`;
            }, (result) => {
                $scope.model.result = `Error: ${result}`;
            })
        }

        // function to return promise
        function checkOddNumberHandler(input) {
            //  $q.defer() method sets up the $promise object
            var defer = $q.defer();

            $timeout(function () {
                if (isNumberOdd(input)) {
                    defer.resolve('Yes, an odd number');                    
                } else {
                    defer.reject('Not an odd number')
                }
                
            }, 1000);

            return defer.promise;
        }

        function isNumberOdd(input) {
            return !Number.isNaN(input) && input % 2 === 1;
        }
    }
]);