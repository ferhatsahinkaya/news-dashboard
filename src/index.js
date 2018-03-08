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
  constructor() {
    super();

    this.state = {
      news: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/news')
      .then(response => response.json())
      .then(json => {
        this.setState({news: json.articles[0].author});
      });
  }

  render() {
    return (
      <div className="news">
        {this.state.news}
      </div>
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('App')
);
