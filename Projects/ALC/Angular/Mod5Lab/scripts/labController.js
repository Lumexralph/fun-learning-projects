// Note that we have added a dependency to registration 
// within our controller. We needed to do this as well as
// declare the dependency in the module declaration because 
// we made the service completely autonomous. If the service were
// created off of the same app module, we would only need to
// include the dependency here in the controller.

app.controller('labController', [
    '$scope', 'registration',
    function ($scope, registration) {
        $scope.reset = reset;
        $scope.submit = submit;
        $scope.submitted = false;
        $scope.token = '';
        
        reset();

        function reset() {
            $scope.model = {};            
        }

        function submit(model) {
            //use the promise value returned

            registration.submit(model).$promise
                                      .then((response) => {                                 
                                          $scope.submitted = true;
                                          $scope.token = response.token;
                                          console.log(response.token, $scope.submitted);
                                          // reset the form object
                                          reset();
                                        
                                        },
                                            (error) => alert('error')
                                    );
            // $scope.model = model;
            // alert(`Submitted\n ${JSON.stringify(model)}`);            
        }
    }
]);