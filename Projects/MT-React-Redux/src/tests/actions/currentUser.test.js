import currentUser from '../../actions/currentUser';

describe('Test for currentUser action', () => {
  it('Should return action object', (done) => {
    const user = {
      userId: 10,
      username: 'Adedayo',
      adminRole: false,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    };

    const result = currentUser(user);
    expect(result.type).toBe('CURRENT_USER');
    expect(result.payload).toMatchObject(user);
    done();
  });
});
