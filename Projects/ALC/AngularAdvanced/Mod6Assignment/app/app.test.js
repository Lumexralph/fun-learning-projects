describe('app module', () => {
  // declare an app variable, and instantiate the app on beforeAll() to come before all test

  var app;

  beforeAll(() => {
    app = angular.module('app');
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});