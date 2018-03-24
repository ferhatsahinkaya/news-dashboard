import { connect } from "react-redux";
import React from 'react';
import Select from 'react-select';
import Source from './source';

const capitalizeFirstLetter = value => !value || value.charAt(0).toUpperCase() + value.slice(1);

const valueToLabelValuePair = value => {
  let obj = {};
  obj['value'] = value;
  obj['label'] = capitalizeFirstLetter(value);
  return obj;
};

const filter = (filter, extractor) => source => extractor(source).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
const isFilterSet = (filter, defaultValue) => filter && (filter !== defaultValue);

const filterBy = theFilter => sources =>
  isFilterSet(theFilter.filter, theFilter.defaultValue) ?
    sources.filter(filter(theFilter.filter, theFilter.extractor)) :
    sources.slice(0);

const convertToValuePair = values => values.map(valueToLabelValuePair);

export class Sources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryFilter: valueToLabelValuePair('all'),
      languageFilter: valueToLabelValuePair('all'),
      selectedSources: new Set([''])
    }
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

    const languageFilter = {
        defaultValue: 'all',
        filter: this.state.languageFilter.value,
        extractor: source => source.language
    };

    const nameFilter = {
        filter: this.state.nameFilter,
        extractor: source => source.name
    };

    return [nameFilter, languageFilter, categoryFilter];
  }

  render() {
    const filteredSources = this.filters()
                              .map(filterType => filterBy(filterType))
                              .reduceRight((filteredSources, func) => func(filteredSources), this.props.sources);

    return (
      <div>
        <div class="container">
          <div class="form-group row mt-2">
            <input type="text" className="form-control form-control-lg" placeholder="Source" onChange={event => this.setState({nameFilter: event.target.value})}/>
          </div>
          <div class="form-group row">
            <label for="category-filter" class="col-2 col-form-label">Category:</label>
            <div class="col-10">
              <Select id="category-filter" value={this.state.categoryFilter} onChange={categoryFilter => this.setState({categoryFilter})} options={convertToValuePair(this.props.categories)}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="language-filter" class="col-2 col-form-label">Language:</label>
            <div class="col-10">
              <Select id="language-filter" value={this.state.languageFilter} onChange={languageFilter => this.setState({languageFilter})} options={convertToValuePair(this.props.languages)}/>
            </div>
          </div>
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
