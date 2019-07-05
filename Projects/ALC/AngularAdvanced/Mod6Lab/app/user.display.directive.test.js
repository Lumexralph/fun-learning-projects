// add a describe block with variables and a beforeEach block

describe('userDisplayDirective', () => {
  // Instantiate the app module and inject dependencies

  var $compile,
        $scope,
       element,
         users;

    beforeEach(() => {
      angular.mock.module('app');
      angular.mock.module('compiled-templates'); // generated JS from html
      angular.mock.inject((_$rootScope_, _$compile_) => {
        // Note that instead of assigning _$rootScope_ to the $scope variable like we did in the controller, we are using _$rootScope_.$new();. This is because a directive creates a new scope when it is instantiated.

        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

    });

    it('should compile an element', () => {
      // The UserDisplayDirective expects to receive an array with the properties first_name, last_name and avatar, so now it is time to set up some mock data, and assign it to $scope

      users = [
        {first_name: 'Elvis', last_name: 'Presley', avatar: 'https://unsplash.it/200'},
        {first_name: 'Johnny', last_name: 'Cash', avatar: 'https://unsplash.it/300'},
        {first_name: 'Carl', last_name: 'Perkins', avatar: 'https://unsplash.it/400'}
      ];
      
      $scope.users = users;

      // Use Angular's $compile service to generate an HTML element from the UserDisplayDirective, and then call $digest. Next, add an expect to see if element was created

      element = $compile('<user-display-directive users = "users"></user-display-directive>')($scope);
      $scope.$digest();
      expect(element).toBeDefined();

      // When unit testing, it is important to remember that only JavaScript files are involved and HTML files are not
      // The solution is to convert your user.display.template.html into an Angular JavaScript module so that you can use it in your unit tests. You will use what is called a preprocessor to generate the template in JavaScript before running the tests.
    });

    it('should have users on the scope', () => {
      expect(element.isolateScope().users).toBeDefined();
    });

    it('should have three users on the scope', () => {
      expect(element.isolateScope().users.length).toEqual(users.length);
    });

    it('the element should have the users in it\'s html', ()=> {
      expect(element.html()).toContain(users[0].first_name);
      expect(element.html()).toContain(users[1].first_name);
      expect(element.html()).toContain(users[2].first_name);
      expect(element.html()).toContain(users[0].last_name);
      expect(element.html()).toContain(users[1].last_name);
      expect(element.html()).toContain(users[2].last_name);
      expect(element.html()).toContain(users[0].avatar);
      expect(element.html()).toContain(users[1].avatar);
      expect(element.html()).toContain(users[2].avatar);
    });

});

// This is Unit Test but in End-to-End tests for your Angular app. End-to-end testing involves automating a real browser to perform user actions instead of simply mocking data and function calls.  Instead of using Karma, End-to-End testing in Angular requires the use of the Protractor tool. Protractor fires up a virtual browser with a technology called Webdriver to interact with your app automatically