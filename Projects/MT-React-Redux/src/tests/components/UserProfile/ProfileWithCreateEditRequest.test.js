import React from 'react';
import renderer from 'react-test-renderer';

import { RequestForm } from '../../../components/UserProfile/ProfileWithCreateEditRequest';


describe('Test for RequestForm', () => {
  let component = renderer.create(
    <RequestForm
      request={{}}
      onChange={value => value}
      onSubmit={e => e}
      message="This is RequestForm"
      pathname="/request/edit"
    />,
  );
  let tree = component.toJSON();

  it('Should render component', () => {
    expect(tree).toMatchSnapshot();
  });


  it('Should call onChange event on title input field', (done) => {
    // manually trigger the callback
    tree.children[0].children[1].children[2].children[0].children[0].props.onChange();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call onChange event on select options', (done) => {
    // manually trigger the callback
    tree.children[0].children[1].children[2].children[1].children[1].props.onChange();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call onChange event on textarea', (done) => {
    component = renderer.create(
      <RequestForm
        request={null}
        onChange={value => value}
        onSubmit={e => e}
        message=""
        pathname=""
      />,
    );
    // manually trigger the callback
    tree.children[0].children[1].children[2].children[2].children[0].props.onChange();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});
