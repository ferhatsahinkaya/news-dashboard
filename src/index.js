import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import NewsBlog from './components/news-blog'
import { store } from './store'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <NewsBlog />
  </Provider>,
  document.getElementById('App')
)
