import currentRequest from '../../reducers/currentRequest';

describe('Test for currentRequest reducer', () => {
  const initialState = { };

  const action = {
    type: 'CURRENT_REQUEST',
    payload: {
      request_id: 1,
      request_title: 'Service the generator',
      request_content: 'Check if things are in order',
      department: 'maintenance',
      status: 'rejected',
    },
  };

  const result = currentRequest(initialState, action);

  it('Should return the new state', (done) => {
    expect(result.request_id).toBe(1);
    expect(result.request_title).toBe('Service the generator');
    expect(result.request_content).toBe('Check if things are in order');
    expect(result.department).toBe('maintenance');
    expect(result.status).toBe('rejected');
    done();
  });
});
