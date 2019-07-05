import React from 'react';
import { shallow } from 'enzyme';

import requests from '../../__mocks__/requestsData';
import AdminRequestTable from '../../../components/Admin/AdminRequestTable';

describe('Test for AdminRequestTable', () => {
  it('Should render without crashing', () => {
    const props = {
      onAccept: jest.fn(),
      onReject: jest.fn(),
      onResolve: jest.fn(),
      requests,
    };

    const wrapper = shallow(<AdminRequestTable {...props} />);
    // click the buttons
    wrapper.find('AdminRequestTableContent').simulate('click');

    expect(wrapper.props().children.type).toBe('div');
  });
});
