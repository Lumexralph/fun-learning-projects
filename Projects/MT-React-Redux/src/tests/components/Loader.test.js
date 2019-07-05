import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Loader from '../../components/Loader';

const renderer = new ShallowRenderer();

describe('Test for Loader component', () => {
  it('Should render the component properly', (done) => {
    renderer.render(<Loader
      type="bubbles"
      color="blue"
    />);

    const output = renderer.getRenderOutput();
    expect(output.props.type).toBe('bubbles');
    expect(output.props.color).toBe('blue');
    done();
  });
});
