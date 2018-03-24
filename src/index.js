import React from 'react'
import ReactDOM from 'react-dom';
import SourceDashboard from './source-dashboard'
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <SourceDashboard />
  </Provider>,
  document.getElementById('App')
);
