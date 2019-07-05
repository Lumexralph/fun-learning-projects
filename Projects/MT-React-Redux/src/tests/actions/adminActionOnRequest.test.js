import adminActionOnRequest from '../../actions/adminActionOnRequest';

describe('Test for admin action', () => {
  it('Should approve a request', () => {
    expect(adminActionOnRequest(1, 'approve')().resolves).toBeUndefined();
  });
});
