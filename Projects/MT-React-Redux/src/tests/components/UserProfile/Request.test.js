import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import data from '../../__mocks__/requestsData';

import Request from '../../../components/UserProfile/Request';

const renderer = new ShallowRenderer();

describe('Test for Request component', () => {
  it('Should render Request components according to length of data array', () => {
    renderer.render(<Request data={data} />);

    const output = renderer.getRenderOutput();

    expect(output.length).toBe(4);

    expect(output[0].type).toBe('div');

    expect(output[1].key).toBe('50');
  });

  it('Should render a div with message when there is no data', () => {
    renderer.render(<Request data={[]} />);

    const output = renderer.getRenderOutput();

    expect(output.type).toBe('div');
  });
});
