import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import FooterContainer from '../../components/home/FooterContainer';

const renderer = new ShallowRenderer();

test('Test for FooterContainer component', () => {
  renderer.render(<FooterContainer background="blue" text="Login" />);

  const component = renderer.getRenderOutput();

  expect(component.type).toEqual('footer');

  expect(component.props.children.length).toEqual(2);
});
