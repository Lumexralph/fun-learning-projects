import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Header from '../../components/home/Header';

const renderer = new ShallowRenderer();

test('Test for Header component', () => {
  renderer.render(
    <Header>
      <p>Ball</p>
    </Header>,
  );

  const component = renderer.getRenderOutput();

  expect(component.type).toEqual('header');
});
