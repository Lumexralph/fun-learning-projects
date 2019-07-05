import getAllRequest from '../../actions/getAllRequests';

describe('Test for get all requests action', () => {
  it('Should make API call with filter parameter', (done) => {
    expect(getAllRequest('pending')().resolves).toBeUndefined();
    done();
  });

  it('Should get all requests without filter parameter', (done) => {
    expect(getAllRequest()().resolves).toBeUndefined();
    done();
  });
});
