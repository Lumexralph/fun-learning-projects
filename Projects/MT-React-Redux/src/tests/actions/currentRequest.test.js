import currentRequest from '../../actions/currentRequest';

describe('Test for currentRequest action', () => {
  it('Should return action object', (done) => {
    const request = {
      title: 'Game of life',
      content: 'Game of the year',
      department: 'Repairs',
    };

    const result = currentRequest(request);
    expect(result.type).toBe('CURRENT_REQUEST');
    expect(result.payload).toMatchObject(request);
    done();
  });
});
