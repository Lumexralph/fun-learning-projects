describe('Search Users', () => {
  var getFriendList;

  beforeEach(() => {
    browser.get('http://localhost:3000');
    getFriendList = element(by.id('friendListButton'))
  });

  it('page title should be User Search', () => {
    expect(browser.getTitle()).toEqual('User Search');
  });

  it('getListButon should be available', () => {
    expect(getFriendList.isPresent()).toBe(true);
  });

  it('the button text should be Get List of Friends', () => {
    expect(getFriendList.getText()).toEqual('Get List of Friends');
  }); 

});