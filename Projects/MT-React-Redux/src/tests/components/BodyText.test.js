import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import BodyText from '../../components/home/BodyText';

const renderer = new ShallowRenderer();

test('Test for BodyText component', () => {
  renderer.render(<BodyText background="blue" text="Login" />);

  const component = renderer.getRenderOutput();

  expect(component.type.toString()).toEqual('Symbol(react.fragment)');
});
