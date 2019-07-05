import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import  { 
  HashRouter as Router, 
  Route, 
  Switch,
  Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>

const RoutedApp = () => (
  <Router>
      <Switch>
          <Redirect exact from="/" to="/issues" />
          <Route path="/issues" component={IssueList} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="*" component={NoMatch} />
      </Switch>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode); // Render the component inside the content Node

if (module.hot) {
  module.hot.accept();
}
