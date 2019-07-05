import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import PrivateAdminRoute from '../../../components/Auth/PrivateAdminRoute';

const SampleComponent = () => (
  <div>Hello World</div>
);
describe('Test for PrivateAdminRoute component', () => {
  it('Should render Request card', () => {
    const component = () => (<p>Ball</p>);

    const props = {
      rest: {
        render: jest.fn(),
      },
      component,
      location: {},
    };

    const shallowObj = shallow(<PrivateAdminRoute {...props} />);

    const renderFn = shallowObj.find(Route).prop('render');
    const renderedComponent = renderFn({ location: 'temp-location' });

    expect(renderedComponent.props.to)
      .toEqual({
        pathname: '/login',
        state: { from: 'temp-location' },
      });
  });

  it('Should render the mock component when localStorage.admin is false', () => {
    localStorage.setItem('admin', 'true');
    const props = {
      rest: {
        render: jest.fn(),
      },
      component: SampleComponent,
    };

    const shallowObj = shallow(<PrivateAdminRoute {...props} />);

    const renderFn = shallowObj.find(Route).prop('render');
    const renderedComponent = renderFn();
    expect(renderedComponent.type)
    .toBe(SampleComponent);
  });
});
