import {TextFilter} from 'react-text-filter';
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
    const sourceFilter = filter => source => source.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    const filteredSources = this.state.filter ?
      this.state.sources.filter(sourceFilter(this.state.filter)) :
      this.state.sources.slice(0);

    return (
      <div>
        <div>
          <TextFilter onFilter={({target: {value: filter}}) => this.setState({filter})} />
        </div>
        <div class="card-columns">
          { filteredSources
              .map(source => <Source key={source.id}
                                     id={source.id}
                                     name={source.name}
                                     description={source.description}
                                     url={source.url} />) }
        </div>
      </div>
    )
  }
}
