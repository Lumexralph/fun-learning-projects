import React from 'react';
import { shallow } from 'enzyme';

import AdminRequestTableContent from '../../../components/Admin/AdminRequestTableContent';

import requests from '../../__mocks__/requestsData';

describe('Test for AdminRequestTable', () => {
  it('Should render without crashing', () => {
    const props = {
      onAccept: jest.fn(),
      onReject: jest.fn(),
      onResolve: jest.fn(),
      requests: [requests[0]],
    };

    const wrapper = shallow(<AdminRequestTableContent {...props} />);
    // click the buttons
    wrapper.find('.accept-btn').simulate('click');

    expect(props.onAccept).toHaveBeenCalled();

    // click the buttons
    wrapper.find('.reject-btn').simulate('click');

    expect(props.onReject).toHaveBeenCalled();

    wrapper.find('.resolve-btn').simulate('click');

    expect(props.onResolve).toHaveBeenCalled();
  });

  it('Should render without <p> tag when there is no request', () => {
    const props = {
      onAccept: jest.fn(),
      onReject: jest.fn(),
      onResolve: jest.fn(),
      requests: [],
    };

    const wrapper = shallow(<AdminRequestTableContent {...props} />);
    expect(wrapper.type()).toBe('tr');
  });
});
