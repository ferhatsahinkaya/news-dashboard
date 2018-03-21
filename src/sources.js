import { connect } from "react-redux";
import {TextFilter} from 'react-text-filter';
import React from 'react';
import Select from 'react-select';
import Source from './source'
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY);

const capitalizeFirstLetter = value => !value || value.charAt(0).toUpperCase() + value.slice(1);

const valueToCategory = source => {
  let obj = {};
  obj['value'] = source;
  obj['label'] = capitalizeFirstLetter(source);
  return obj;
};

const filter = (filter, extractor) => source => extractor(source).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
const isFilterSet = (filter, defaultValue) => filter && (filter !== defaultValue);

const filterBy = theFilter => sources =>
  isFilterSet(theFilter.filter, theFilter.defaultValue) ?
    sources.filter(filter(theFilter.filter, theFilter.extractor)) :
    sources.slice(0);

export class Sources extends React.Component {
  constructor() {
    super();

    this.state = {
      sources: [],
      categories: ['all'],
      categoryFilter: valueToCategory('all'),
      selectedSources: new Set([''])
    }
  }

  componentDidMount() {
    newsapi.v2.sources()
    .then(response => {
      this.setState({
        sources : response.sources,
        categories: this.state.categories.map(valueToCategory)
                    .concat(response.sources
                      .map(source => source.category)
                      .filter((value, index, self) => self.indexOf(value) === index)
                      .map(valueToCategory))
      })
    });
  }

  componentWillReceiveProps(newProps) {
    const selectedSources = this.state.selectedSources;

    newProps.selected ?
      selectedSources.add(newProps.id) :
      selectedSources.delete(newProps.id);

    this.setState({
      selectedSources: selectedSources
    });
  }

  filters() {
    const categoryFilter = {
        defaultValue: 'all',
        filter: this.state.categoryFilter.value,
        extractor: source => source.category
    };

    const nameFilter = {
        filter: this.state.nameFilter,
        extractor: source => source.name
    };

    return [nameFilter, categoryFilter];
  }

  render() {
    const filteredSources = this.filters()
                              .map(filterType => filterBy(filterType))
                              .reduceRight((filteredSources, func) => func(filteredSources), this.state.sources);

    return (
      <div>
        <div>
          <TextFilter onFilter={({target: {value: nameFilter}}) => this.setState({nameFilter})} placeHolder="Source" />
          <Select value={this.state.categoryFilter} onChange={categoryFilter => this.setState({categoryFilter})} options={this.state.categories}/>
        </div>
        <div class="card-columns">
          { filteredSources
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
