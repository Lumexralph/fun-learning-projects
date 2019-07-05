import registerUser from '../../actions/registerUser';

describe('Test for register user request action', () => {
  it('Should make API call to register user', () => {
    const user = {
      username: 'Adedayo',
      password1: 'gatekeeper',
      password2: 'gatekeeper',
      email: 'adedayo@gmail.com',
    };

    expect(registerUser(user)().resolves).toBeUndefined();
  });
});
