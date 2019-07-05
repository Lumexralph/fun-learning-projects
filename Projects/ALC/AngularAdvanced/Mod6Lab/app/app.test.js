describe('app module', () => {
  var app;

  beforeAll(() => {
    app = angular.module('app');
  })

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

})