import userRequests from '../../actions/userRequests';
import requests from '../__mocks__/requestsData';

describe('Test for userRequests action', () => {
  it('Should return action object', (done) => {
    const result = userRequests(requests);
    expect(result.type).toBe('USER_REQUESTS');
    expect(result.payload).toMatchObject(requests);
    done();
  });
});
