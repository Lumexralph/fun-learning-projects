import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import LoadingStatus from '../../components/LoadingStatus';

const renderer = new ShallowRenderer();

describe('Test for Loader component', () => {
  it('Should render the Loader when status is true', () => {
    renderer.render(
      <LoadingStatus
        status
        text="Testing Component"
      />,
    );

    const output = renderer.getRenderOutput();

    expect(output.type).toBe('div');

    expect(output.props.className).toBe('loader');
  });
});
