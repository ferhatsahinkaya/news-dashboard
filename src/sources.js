import React from 'react';
import Source from './source'
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY);

export default class Sources extends React.Component {
  constructor() {
    super();

    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    newsapi.v2.sources()
    .then(response => {
      this.setState({sources : response.sources})
    });
  }

  render() {
    return (
      <div class="card-columns">
        { this.state.sources
            .map(source => <Source id={source.id}
                                   name={source.name}
                                   description={source.description}
                                   url={source.url}
                                   sourceSelected={this.sourceSelected}
                                   sourceUnselected={this.sourceUnselected}/>) }
      </div>
    )
  }
}
