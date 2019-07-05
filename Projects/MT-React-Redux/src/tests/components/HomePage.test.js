import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HomePage from '../../components/home/HomePage';

const renderer = new ShallowRenderer();

test('Test for HomepPage component', () => {
  renderer.render(<HomePage />);

  const component = renderer.getRenderOutput();

  expect(component.type).toEqual('div');

  expect(component.props.className).toEqual('container');

  expect(component.props.children.length).toEqual(3);
});
