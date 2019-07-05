import currentUser from '../../reducers/currentUser';

describe('Test for currentUser reducer', () => {
  const initialState = { };
  const action = {
    type: 'CURRENT_USER',
    payload: {
      userId: 10,
      username: 'Adedayo',
      adminRole: false,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  };

  const result = currentUser(initialState, action);

  it('Should return the new state', (done) => {
    expect(result.userId).toBe(10);
    expect(result.username).toBe('Adedayo');
    expect(result.adminRole).toBe(false);
    expect(result.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    done();
  });
});
