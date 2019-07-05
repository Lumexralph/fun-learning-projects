import loadUserRequests from '../../actions/loadUserRequests';

describe('Test for admin action', () => {
  it('Should approve a request', () => {
    expect(loadUserRequests()().resolves).toBeUndefined();
  });
});
