// Just like you did in the Controller unit test, we need to set up the initial "mock angular" environment for the test to use. Add an initial describe with variables declared and a beforeEach block that instantiates our app module 

describe('UserService', () => {
  var $rootScope,
    $httpBackend,
              $q,
     UserService,
    mockDeferred;

    beforeEach(() => {
      angular.mock.module('app');

      // Add an inject block to load your dependencies

      angular.mock.inject((_$rootScope_, _$httpBackend_, _$q_, _UserService_) => {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        UserService = _UserService_;
      });
    });

    // test for the existence of the service module and the getUsers() method
    it('should be defined', () => {
      expect(UserService).toBeDefined();
    });

    it('getUsers should be defined', () => {
      expect(UserService.getUsers).toBeDefined();
    });

    // When testing HTTP calls, you generally want your mock data to have the same format as the actual server response

    it('getUsers should return a value', () => {
        var mockData = {
          "page":1,
          "per_page":3,
          "total":12,
          "total_pages":4,
          "data":[  
              {                    
                  id: 1,
                  first_name: "George",
                  last_name: "Bluth",
                  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
              },
              {  
                id: 2,
                first_name: "Janet",
                last_name: "Weaver",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
              },
              {  
                id: 3,
                first_name: "Emma",
                last_name: "Wong",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
              }
          ]
      };

      $httpBackend.when('GET', 'http://reqres.in/api/users')
                  .respond(200, { data: mockData });
      
      var resolvedValue;
      var promise = UserService.getUsers();
      promise.then((value) => {
        resolvedValue = value;
      });

      // calling UserService.getUsers(), and you are using then(), in order to wait for it to execute with the resolved data on the promise. This is done in order to avoid having your app getting stuck "waiting." You will then check whether the resolvedValue is equal to the mockData

      $httpBackend.flush();
      expect(resolvedValue).toEqual(mockData);

    });

});