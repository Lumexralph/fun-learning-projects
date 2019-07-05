import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import testRenderer from 'react-test-renderer';
import { BrowserRouter as Router, Route ,Redirect} from 'react-router-dom';
import { shallow } from 'enzyme';
import ProtectProfileRoute from '../../../components/UserProfile/ProtectProfileRoute';

const renderer = new ShallowRenderer();

const SampleComponent = () => (
  <div>Hello World</div>
);
describe('Test for ProtectProfileRoute component', () => {
  it('Should render Request card', () => {
    const component = () => (<p>Ball</p>);

    const props = {
      rest: {
        render: jest.fn(),
      },
      component,
    };

    // renderer.render(<ProtectProfileRoute {...props} />);
    const shallowObj = shallow(<ProtectProfileRoute {...props} />);

    const renderFn = shallowObj.find(Route).prop('render');
    const renderedComponent = renderFn({ location: 'temp-location' });
    expect(renderedComponent.props.to)
      .toEqual({
        pathname: '/login',
        state: { from: 'temp-location' },
      });
  });

  it('Should render the mock component when localStorage.admin is false', () => {

    localStorage.setItem('admin', 'false');
    const props = {
      rest: {
        render: jest.fn(),
      },
      component: SampleComponent,
    };

    // renderer.render(<ProtectProfileRoute {...props} />);
    const shallowObj = shallow(<ProtectProfileRoute {...props} />);

    const renderFn = shallowObj.find(Route).prop('render');
    const renderedComponent = renderFn();
    expect(renderedComponent.type)
    .toBe(SampleComponent)
  });
});
