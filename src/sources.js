import { connect } from "react-redux";
import {TextFilter} from 'react-text-filter';
import React from 'react';
import Select from 'react-select';
import Source from './source'
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY);

export class Sources extends React.Component {
  constructor() {
    super();

    this.state = {
      sources: [],
      selectedSources: new Set([''])
    }
  }

  componentDidMount() {
    newsapi.v2.sources()
    .then(response => {
      this.setState({sources : response.sources})
    });
  }

  componentWillReceiveProps(newProps) {
    const selectedSources = this.state.selectedSources;
    selectedSources.has(newProps.id) ?
      selectedSources.delete(newProps.id) :
      selectedSources.add(newProps.id);

    this.setState({
      selectedSources: selectedSources
    });
  }

  render() {
    const nameFilter = filter => source => source.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

    const filteredSources = this.state.nameFilter ?
      this.state.sources.filter(nameFilter(this.state.nameFilter)) :
      this.state.sources.slice(0);

    const furtherFilteredSources = this.state.categoryFilter ?
        filteredSources.filter(source => source.category.toLowerCase().indexOf(this.state.categoryFilter.value.toLowerCase()) >= 0) :
        filteredSources.slice(0);

    const valueToCategory = source => {
      let obj = {};
      obj['label'] = obj['value'] = source;
      return obj;
    };

    const categories = this.state.sources
        .map(source => source.category)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(valueToCategory);

    alert('categories: ' + JSON.stringify(categories));

    // alert('value: ' + JSON.stringify(value));
    // alert('filteredSources: ' + JSON.stringify(filteredSources));

    return (
      <div>
        <div>
          <TextFilter onFilter={({target: {value: nameFilter}}) => this.setState({nameFilter})} placeHolder="Source" />
          <Select value='Business' onChange={categoryFilter => this.setState({categoryFilter})} placeHolder="Category" simpleValue multi options={categories}/>
        </div>
        <div class="card-columns">
          { furtherFilteredSources
              .map(source => <Source key={source.id}
                                     id={source.id}
                                     name={source.name}
                                     selected={this.state.selectedSources.has(source.id)}
                                     description={source.description}
                                     url={source.url} />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => (
    state.sourceSelection
);

const SourcesContainer = connect(mapStateToProps)(Sources);

export default SourcesContainer;
