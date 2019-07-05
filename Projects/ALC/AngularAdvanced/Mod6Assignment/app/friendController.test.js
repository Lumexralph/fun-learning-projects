describe('friendController', () => {
  // The friendService.getFriends() returns a promise to the friendController.getFriendList() that resolves when data is returned. Since you are only testing the controller, you don't actually want to make a REST call.

  // You will mock this by spying on when friendService.getFriends() is called. This will allow you to hijack the call and return your own promise. That promise can then be manipulated to determine that the controller is doing the proper thing when data is returned.

  var $rootScope, $q, $controller, fvm, friendService, mockDeferred;

  // variables to be used in angular mock
  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject((_$rootScope_, _$controller_, _$q_, _friendService_) => {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $q = _$q_;
      friendService = _friendService_;

      // Set up the mock promise, and spy on the friendService.getFriends() method so that you can use your mockPromise

      mockDeferred = $q.defer();
      spyOn(friendService, 'getFriends').and.returnValue(mockDeferred.promise);

      // instantiate the controller
      fvm = $controller('friendController', {
        friendService: friendService
      });
    });
  });

  it('should have fvm defined', () => {
    expect(fvm).toBeDefined();
  });

  it('should have fvm.getFriendList() defined', () => {
    expect(fvm.getFriendList).toBeDefined();
  });

  describe('fvm.getFriendList() should call friendService.getFriends and return result', () => {

    it('should have called friendService.getFriends() and set fvm.friends', () => {
      var mockFriends = ['friend A', 'friend B', 'friend C', 'friend D'];

      fvm.getFriendList();

      // spy comes into action
      mockDeferred.resolve(mockFriends);
      $rootScope.$apply();

      expect(friendService.getFriends).toHaveBeenCalled();
      expect(fvm.friends).toEqual(mockFriends);
      expect(fvm.friends.length).toEqual(mockFriends.length);      
    });

  });

});