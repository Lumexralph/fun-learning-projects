import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { SingleRequest } from '../../../components/UserProfile/SingleRequest';

const renderer = new ShallowRenderer();

describe('Test for App component', () => {
  it('Should render the component', () => {
    const request = {
      request_id: 47,
      request_title: 'Service the generator',
      request_content: 'Check if things are in order',
      department: 'maintenance',
      status: 'pending',
    };

    renderer.render(<SingleRequest request={request} />);

    const output = renderer.getRenderOutput();
    expect(output.type).toBe('div');
    expect(output.props.className).toBe('request-container');
  });
});
