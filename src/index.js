import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <DashboardItems />
      </div>
    )
  }
}

class DashboardItems extends React.Component {
  render() {
    return (
      <div className="card-list">
        <News />
      </div>
    )
  }
}

class News extends React.Component {
  render() {
    return (
      <div className="news">
        Hello World!
      </div>
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('App')
);
