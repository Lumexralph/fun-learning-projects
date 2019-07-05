import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import BodyContainer from '../../components/home/BodyContainer';

const renderer = new ShallowRenderer();

test('Test for BodyContainer component', () => {
  const text = ['Login', 'Signup'];
  renderer.render(<BodyContainer text={text} />);
  const component = renderer.getRenderOutput();

  expect(component.type).toEqual('main');

  expect(component.props.children.type).toEqual('section');

  expect(component.props.children.props.className).toEqual('heading-img');

  expect(component.props.children.props.children.type).toEqual('div');
});
