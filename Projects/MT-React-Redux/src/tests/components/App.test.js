import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../../components/App';

const renderer = new ShallowRenderer();

test('Test for App component', () => {
  renderer.render(<App />);

  const output = renderer.getRenderOutput();
  expect(output.props).toHaveProperty('store');
});
