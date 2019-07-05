import userRequests from '../../reducers/userRequests';
import data from '../__mocks__/requestsData';

describe('Test for userRequests reducer', () => {
  const initialState = [];

  const action = {
    type: 'USER_REQUESTS',
    payload: data,
  };

  const result = userRequests(initialState, action);

  it('Should return the new state', (done) => {
    expect(result.length).toBe(4);
    expect(result[0].request_id).toBe(47);
    expect(result[1].request_title).toBe('Service the generator');
    done();
  });
});
