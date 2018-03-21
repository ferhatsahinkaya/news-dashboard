import React from 'react'
import ReactDOM from 'react-dom';
import Dashboard from './dashboard'
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('App')
);
