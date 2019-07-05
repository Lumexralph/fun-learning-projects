// Since you are only testing the controller, you don't actually want to make a REST call. You will mock this by spying on when UserService.getUsers() is called. This will allow you to hijack the call and return your own promise. That promise can then be manipulated to determine that the controller is doing the proper thing when data is returned.

describe('UserDisplayController', () => {
  // These variables will be used by the Inject service in angular mock. Note that they have similar names to values used as dependencies your Controller.

  var $rootScope,
              $q,
     $controller,
              vm,
     UserService,
    mockDeferred;

  // create a beforeEach block and initialze your app

  beforeEach(() => {
    angular.mock.module('app');

    // inject some dependencies, like so

    angular.mock.inject(function (_$rootScope_, _$controller_, _$q_, _UserService_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $q = _$q_;
      UserService = _UserService_;    
    });

    // Set up the mock promise, and spy on the UserService.getUsers() method so that you can use your mockPromise

    mockDeferred = $q.defer();
    spyOn(UserService, 'getUsers').and.returnValue(mockDeferred.promise);

    // Finally, instantiate the controller

    vm = $controller('UserDisplayController', {
      userService : UserService
    })   // Your beforeEach has been created, and you can now write some tests

  });  

  // check to see if the controller has been instantiated and that the executeSearch() method exists

  it('should have vm defined', () => {
    expect(vm).toBeDefined();
  });

  it('should have vm.executeSearch defined', () => {
    expect(vm.executeSearch).toBeDefined();
  });

  describe('vm.execute search should call UserService.getUsers and return a result', () => {
    
    it('should call UserService.getUsers and set vm.users', () => {

      var mockUsers = ['user 1', 'user 2'];
      vm.executeSearch();

      // Remember when you set up a spy in beforeEach?
      // Because you just called vm.executeSearch(), the spy will kick in and return your mockDeferred.promise instead of the actual UserService promise. You will resolve that promise with the mock user data

      mockDeferred.resolve(mockUsers);
      $rootScope.$apply();

      expect(UserService.getUsers).toHaveBeenCalled();
      expect(vm.users).toEqual(mockUsers);
      
    })

  });

});