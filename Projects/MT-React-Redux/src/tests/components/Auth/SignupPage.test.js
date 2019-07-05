import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { SignupPage, mapDispatchToProps } from '../../../components/Auth/SignupPage';

describe('Test for LoginPage with non-admin', () => {
  const response = {
    data: {
      token: 'abcd',
    },
  };

  const signupNewUser = Promise.resolve(response);

  const component = renderer.create(
    <Router>
      <SignupPage
        signupNewUser={() => signupNewUser}
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

  it('Should call change event on username input field', (done) => {
    componentInstance.findByProps({ name: 'username' }).props.onChange({ target: { value: '' } });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on psw1 input field', (done) => {
    componentInstance.findByProps({ name: 'psw1' }).props.onChange({ target: { value: '' } });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on psw2 input field', (done) => {
    componentInstance.findByProps({ name: 'psw2' }).props.onChange({ target: { value: '' } });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on email input field', (done) => {
    componentInstance.findByProps({ name: 'email' }).props.onChange({ target: { value: '' } });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should dispatch signupNewUser action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).signupNewUser({ name: 'test' })).toBeUndefined();
    done();
  });

  it('Should dispatch setCurrentUser action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).setCurrentUser({ name: 'test' })).toBeUndefined();
    done();
  });
});
