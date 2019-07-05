import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import { addArticle } from './actions';

console.log('Working for redux');

window.store = store;
window.addArticle = addArticle;

const root = document.getElementById('app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
