import React from 'react';
import renderer from 'react-test-renderer';

import SignupForm from '../../../components/Auth/SignupFormContainer';

describe('Test for Signup Form container', () => {
  const component = renderer.create(
    <SignupForm
      onSubmit={value => value}
      onUsernameChange={value => value}
      onEmailChange={e => e}
      onPasswordChange={e => e}
    />,
  );

  const tree = component.toJSON();
  it('Should render properly', () => {
    expect(tree).toMatchSnapshot();
  });
});
