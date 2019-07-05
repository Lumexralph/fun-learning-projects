import React from 'react';
import {shallow} from 'enzyme';
import { AdminDashBoard, mapDispatchToProps, mapStateToProps } from '../../../components/Admin/AdminDashBoard';

describe('Test for AdminDashBoard', () => {
  it('Should call "componentDidMount()" ', () => {
    const spy = jest.spyOn(AdminDashBoard.prototype, 'componentDidMount');

    const response1 = {
      data: {
        message: 'prof',
      },
    };

    const response2 = {
      data: {
      },
    };

    const event = { target: { value: '' } };

    const requestWithStatus = {
      id: 1,
      status: 'rejected',
    };

    const funcWithPromiseResolved1 = () => Promise.resolve(response1);
    const funcWithPromiseResolved2 = () => Promise.resolve(response2);
    const mockProps = {
      loadAdminRequests: funcWithPromiseResolved1,
      storeUserRequests: jest.fn(),
      adminAction: funcWithPromiseResolved1,
    };

    shallow(<AdminDashBoard {...mockProps} />);

    mockProps.loadAdminRequests = funcWithPromiseResolved2;

    const wrapper = shallow(<AdminDashBoard {...mockProps} />);
    expect(spy).toHaveBeenCalled();

    // call the handleRequestFilter method
    let result = wrapper.instance().handleRequestFilter(event)
      .then(response => response);

    expect(result.resolve).toBeUndefined();

    // call rejectRequest method with request status rejected
    result = wrapper.instance().rejectRequest(event, requestWithStatus);
    expect(result).toBe(null);

    // call rejectRequest method with request status resolved
    requestWithStatus.status = 'resolved';
    result = wrapper.instance().rejectRequest(event, requestWithStatus);

    expect(result).toBe(null);

    // call the api call if the status is not approved or resolved
    requestWithStatus.status = '';
    result = wrapper.instance().rejectRequest(event, requestWithStatus);

    expect(result.resolve).toBeUndefined();

    // call approveRequest method with request status approved
    requestWithStatus.status = 'approved';
    result = wrapper.instance().approveRequest(event, requestWithStatus);

    expect(result).toBe(null);

    // call approveRequest method with request status resolved
    requestWithStatus.status = 'resolved';
    result = wrapper.instance().approveRequest(event, requestWithStatus);

    expect(result).toBe(null);

    // call the api call if the status is not approved or resolved
    requestWithStatus.status = '';
    result = wrapper.instance().approveRequest(event, requestWithStatus);

    expect(result.resolve).toBeUndefined();

    // call resolveRequest method with request status resolved
    requestWithStatus.status = 'resolved';
    result = wrapper.instance().resolveRequest(event, requestWithStatus);

    expect(result).toBe(null);

    // call the api call if the status is not resolved
    requestWithStatus.status = '';
    result = wrapper.instance().resolveRequest(event, requestWithStatus);

    expect(result.resolve).toBeUndefined();
  });

  it('Should dispatch loadAdminRequests action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).loadAdminRequests(1)).toBeUndefined();
    done();
  });

  it('Should dispatch storeUserRequests action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).storeUserRequests({ request: 'test' })).toBeUndefined();
    done();
  });

  it('Should dispatch adminAction action', (done) => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch).adminAction(1, { name: 'test' })).toBeUndefined();
    done();
  });

  it('Should have userRequests in store', (done) => {
    const store = mapStateToProps({ userRequests: 'users' });
    done();
    expect(store.requests).toBe('users');
  });
});
