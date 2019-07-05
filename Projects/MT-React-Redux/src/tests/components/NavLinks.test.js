import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import testRenderer from 'react-test-renderer';

import NavLink from '../../components/home/NavLink';

const renderer = new ShallowRenderer();

test('Test for NavLink component', () => {
  const history = { push: jest.fn() };

  renderer.render(<NavLink text="Login" history={history} />);

  let component = renderer.getRenderOutput();

  expect(component.type).toEqual('li');

  expect(component.props.children.props.to).toEqual('/login');

  expect(component.props.children.props.className).toEqual('btn nav-btn nav-link');

  component = testRenderer.create(<NavLink text="Logout" history={history} />);

  const componentInstance = component.root;

  const result = componentInstance.findByType('button').props.onClick();

  expect(result).toBe(null);
});
