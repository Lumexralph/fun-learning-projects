import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import HomePage from './home/HomePage';
import SignupPage from './Auth/SignupPage';
import LoginPage from './Auth/LoginPage';
import ProfileWithUserRequests from './UserProfile/ProfileWithUserRequests';
import ProfileWithRequestForm from './UserProfile/ProfileWithCreateEditRequest';
import SingleRequestPage from './UserProfile/SingleRequest';
import AdminDashBoard from './Admin/AdminDashBoard';
import ProtectProfileRoute from './UserProfile/ProtectProfileRoute';
import PrivateAdminRoute from './Auth/PrivateAdminRoute';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <ProtectProfileRoute path="/profile" component={ProfileWithUserRequests} />
        <ProtectProfileRoute path="/request/create" component={ProfileWithRequestForm} />
        <ProtectProfileRoute path="/request/edit" component={ProfileWithRequestForm} />
        <ProtectProfileRoute path="/requests/:id" component={SingleRequestPage} />
        <PrivateAdminRoute path="/admin" component={AdminDashBoard} />
      </Switch>
    </Router>
  </Provider>

);

export default App;
