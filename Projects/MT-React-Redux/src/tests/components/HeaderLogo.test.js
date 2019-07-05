import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HeaderLogo from '../../components/home/HeaderLogo';

const renderer = new ShallowRenderer();

test('Test for HeaderLogo component', () => {
  renderer.render(<HeaderLogo />);

  const component = renderer.getRenderOutput();

  expect(component.type).toEqual('img');

  expect(component.props.className).toEqual('header-logo');

  expect(component.props.alt).toEqual('header logo');
});
