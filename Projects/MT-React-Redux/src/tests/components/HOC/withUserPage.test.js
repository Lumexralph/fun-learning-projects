import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import withUserPage from '../../../components/HOC/withUserPage';
import { RequestForm } from '../../../components/UserProfile/ProfileWithCreateEditRequest';
import data from '../../__mocks__/requestsData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  userRequests: [{
    name: 'fixzit',
  }],
  currentRequest: {
    name: 'fixzit',
  },
});


// const renderer = new ShallowRenderer();

describe('Test for higher order component userpage', () => {
  const UserPage = withUserPage(RequestForm);

  const history = {
    location: {
      pathname: '/request/create',
    },
  };

  const request = {
    request_id: 47,
    request_title: 'Service the generator',
    request_content: 'Check if things are in order',
    department: 'maintenance',
    status: 'pending',
  };

  const match = {
    params: {
      id: '2',
    },
  };

  const getUserRequests = Promise.resolve(data);
  const getRequestById = () => Promise.resolve(request);
  const viewedRequest = e => e;
  const storeUserRequests = (resp = data) => resp;
  const createRequest = () => Promise.resolve(request);

  let component = renderer.create(
    <Router><UserPage
      store={store}
      history={history}
      match={match}
      requests={data}
      viewedRequest={viewedRequest}
      getRequestById={id => getRequestById(id)}
      getUserRequests={() => getUserRequests}
      storeUserRequests={storeUserRequests}
      createRequest={(requetsData => createRequest(requetsData))}
    />
    </Router>
    ,
  );

  let tree = component.toJSON();
  let componentInstance = component.root;

  it('Should return another component', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have an onSubmit meethod called in rendered component', (done) => {
    componentInstance.findByType('form').props.onSubmit({
      preventDefault: () => true,
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should call change event on username input field', (done) => {
    componentInstance.findByProps({ name: 'title' }).props.onChange({ target: { value: '' } });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should return another component with different data', (done) => {
    const history2 = {
      location: {
        pathname: '/',
      },
    };

    const match2 = {
      params: '',
    };
    component = renderer.create(
      <Router><UserPage
        store={store}
        history={history2}
        match={match2}
        requests={data}
        viewedRequest={viewedRequest}
        getRequestById={id => getRequestById(id)}
        getUserRequests={() => getUserRequests}
        storeUserRequests={storeUserRequests}
        createRequest={(requetsData => createRequest(requetsData))}
      />
      </Router>
      ,
    );
    tree = component.toJSON();
    componentInstance = component.root;
    expect(tree).toMatchSnapshot();
    done();
  });

  it('Should have an onSubmit meethod called in rendered component', (done) => {
    componentInstance.findByType('form').props.onSubmit({
      preventDefault: () => true,
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});
