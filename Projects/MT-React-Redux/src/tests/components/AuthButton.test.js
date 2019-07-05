import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AuthButton from '../../components/home/AuthButton';

const renderer = new ShallowRenderer();

test('Test for AuthButton', () => {
  renderer.render(<AuthButton background="blue" text="Login" />);

  const component = renderer.getRenderOutput();

  expect(component.props.to).toEqual('/login');

  expect(component.props.children.type).toEqual('button');

  expect(component.props.children.props.className).toEqual('btn signup-login-btn blue');

  expect(component.props.children.props.children).toEqual('Login');
});
