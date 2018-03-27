import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SourceDashboard from './source-dashboard'
import NewsDashboard from './news-dashboard'
import { store } from './store'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/">Navbar</a>

          <div>
                <a class="nav-link" href="/sources">Sources</a>
                <a class="nav-link" href="/news">News</a>
          </div>
        </nav>

        <Route exact path="/" component={SourceDashboard} />
        <Route exact path="/sources" component={SourceDashboard} />
        <Route exact path="/news" component={NewsDashboard} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('App')
)
