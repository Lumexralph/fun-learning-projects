import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from '../../../components/Auth/LoginForm';

// const renderer = new ShallowRenderer();

describe('Test for Login Form component', () => {
  it('Should render properly', () => {
    const component = renderer.create(
      <LoginForm
        onSubmit={value => value}
        onUsernameChange={value => value}
        onPasswordInput={e => e}
      />,
    );
    const componentInstance = component.root;

    expect(componentInstance.findByType('form').props.onSubmit()).toBeUndefined();

    expect(componentInstance.findByProps({ name: 'uname' }).props.onChange()).toBeUndefined();

    expect(componentInstance.findByProps({ name: 'psw' }).props.onChange()).toBeUndefined();
    expect(true).toBe(true);
  });
});
