import React from 'react';
import { shallow } from 'enzyme';

import AdminPanel from '../../../components/Admin/AdminPanel';

describe('Test for AdminPanel', () => {
  it('Should render without crashing', () => {
    const props = {
      onFilter: jest.fn(),
    };

    const wrapper = shallow(<AdminPanel {...props} />);
    wrapper.find('select').simulate('change');
    expect(props.onFilter).toHaveBeenCalled();
  });
});
