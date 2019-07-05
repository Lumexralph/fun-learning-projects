import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HeaderContainer from '../../components/home/HeaderContainer';

const renderer = new ShallowRenderer();

test('Test for HeaderContainer component', () => {
  renderer.render(<HeaderContainer navText={['Login', 'Signup']} />);

  const component = renderer.getRenderOutput();

  expect(component.props.children.length).toEqual(2);
});
