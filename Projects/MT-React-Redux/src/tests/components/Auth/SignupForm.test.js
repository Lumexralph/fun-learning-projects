import React from 'react';
import renderer from 'react-test-renderer';

import SignupForm from '../../../components/Auth/SignupForm';

describe('Test for Signup Form component', () => {
  const component = renderer.create(
    <SignupForm
      onSubmit={value => value}
      onUsernameChange={value => value}
      onEmailChange={e => e}
      onPasswordChange={e => e}
    />,
  );

  let tree = component.toJSON();
  const componentInstance = component.root;

  it('Should render properly', () => {
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
    componentInstance.findByProps({ name: 'username' }).props.onChange();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on psw1 input field', (done) => {
    componentInstance.findByProps({ name: 'psw1' }).props.onChange();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on psw2 input field', (done) => {
    componentInstance.findByProps({ name: 'psw2' }).props.onChange();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on email input field', (done) => {
    componentInstance.findByProps({ name: 'email' }).props.onChange();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});
