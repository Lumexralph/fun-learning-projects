import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import data from '../../__mocks__/requestsData';
import { UserRequests } from '../../../components/UserProfile/ProfileWithUserRequests';

const renderer = new ShallowRenderer();

describe('Test for UserRequests component', () => {
  it('Should render UserRequests components according to length of data array', () => {
    renderer.render(<UserRequests requests={data} />);

    const output = renderer.getRenderOutput();
    expect(output.props.children.props.data.length).toBe(data.length);
    expect(output.type).toBe('div');
  });
});
