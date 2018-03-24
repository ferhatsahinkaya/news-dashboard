import React from 'react'
import ReactDOM from 'react-dom'
import SourceDashboard from './source-dashboard'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <SourceDashboard />
  </Provider>,
  document.getElementById('App')
)
