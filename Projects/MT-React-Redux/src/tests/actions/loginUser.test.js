import loginUser from '../../actions/loginUser';

describe('Test for login user request action', () => {
  it('Should make API call to login user', () => {
    const user = {
      username: 'bj',
      password: 'gatekeeper',
    };
    expect(loginUser(user)().resolves).toBeUndefined();
  });
});
