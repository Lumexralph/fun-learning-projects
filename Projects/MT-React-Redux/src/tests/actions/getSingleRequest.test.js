import getSingleRequest from '../../actions/getSingleRequest';

describe('Test for admin action', () => {
  it('Should approve a request', () => {
    expect(getSingleRequest(1)().resolves).toBeUndefined();
  });
});
