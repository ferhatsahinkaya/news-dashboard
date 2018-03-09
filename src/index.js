import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('');

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
        <Sources />
      </div>
    )
  }
}

class Source extends React.Component {
  render() {
    return (
      <div className="source">
        {this.props.id}
      </div>
    )
  }
}

class Sources extends React.Component {
  constructor() {
    super();

    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    newsapi.v2.sources()
    .then(response => {
      this.setState({'sources' : response.sources})
    });
  }

  render() {
    return (
      <div className="sources">
        { this.state.sources
            .map(source => <Source id={source.id}
                                   name={source.name}
                                   description={source.description}
                                   url={source.url} />) }
      </div>
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('App')
);
