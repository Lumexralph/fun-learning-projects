import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoginPage, mapDispatchToProps } from '../../../components/Auth/LoginPage';

describe('Test for LoginPage with admin', () => {
  const response = {
    data: {
      adminRole: true,
    },
  };

  const login = Promise.resolve(response);

  const component = renderer.create(
    <Router>
      <LoginPage
        login={() => login}
        setCurrentUser={e => e}
        history={{}}
      />
    </Router>
    ,
  );
  let tree = component.toJSON();
  const componentInstance = component.root;

  it('Should render component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should call submit event on form', (done) => {
    componentInstance.findByType('form').props.onSubmit({
      preventDefault: () => true,
    });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should have the onChange event on input field', (done) => {
    componentInstance.findByProps({ name: 'uname' }).props.onChange({ target: { value: '' } });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should have the onChange event on input field', (done) => {
    componentInstance.findByProps({ name: 'psw' }).props.onChange({ target: { value: '' } });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should dispatch login action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).login({ name: 'test' })).toBeUndefined();
    done();
  });

  it('Should dispatch setCurrentUser action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).setCurrentUser({ name: 'test' })).toBeUndefined();
    done();
  });
});
