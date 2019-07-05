import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import data from '../../__mocks__/requestsData';

import RequestCard from '../../../components/UserProfile/RequestCard';

const renderer = new ShallowRenderer();

describe('Test for RequestCard component', () => {
  const props = {
    title: data[0].request_title,
    department: data[0].department,
    status: data[0].status,
    id: data[0].request_id,
  };

  it('Should render Request card', () => {
    renderer.render(<RequestCard {...props} />);

    const output = renderer.getRenderOutput();

    expect(output.type).toBe('div');

    expect(output.props.className).toBe('flip-card');
  });
});
