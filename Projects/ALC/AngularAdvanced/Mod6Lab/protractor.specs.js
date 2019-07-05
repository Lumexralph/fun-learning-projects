// create a describe block with declared variables and a beforeEach block

describe('Search Users', () => {
  var searchButton;

// The beforeEach() function will execute code that you need to run before running your test.

  beforeEach(() => {
    browser.get('http://localhost:3100');
    searchButton = element(by.id('searchButton'));

  });

  // first tests will check to see that your page title is correct, that the button exists, and that the button text is correct. Create it blocks

  it('the page title should be User Search', () => {
    expect(browser.getTitle()).toEqual('User Search');
  });

  it('search button should be available', () => {
    expect(searchButton.isPresent()).toBe(true);
  });

  it('the button text should be Search Users', () => {
    expect(searchButton.getText()).toEqual('Search Users');
  });

  it('clicking search button will do a search', () => {
    searchButton.submit();
    var usersElement = element.all(by.repeater('user in users'));
    expect(usersElement.count()).toEqual(3);
  });
  
});