import { connect } from "react-redux";
import React from 'react';
import Select from 'react-select';
import SourceFilters from './source-filters';
import Source from './source';

const filter = (filter, extractor) => source => extractor(source).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
const isFilterSet = (filter, defaultValue) => filter && (filter !== defaultValue);

const filterBy = theFilter => sources =>
  isFilterSet(theFilter.filterValue, theFilter.defaultValue) ?
    sources.filter(filter(theFilter.filterValue, theFilter.extractor)) :
    sources.slice(0);

export class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const filteredSources = this.props.sourceFilters
                              .map(filterType => filterBy(filterType))
                              .reduceRight((filteredSources, func) => func(filteredSources), this.props.sources);

    return (
      <div>
        <SourceFilters categories={this.props.categories}
                       languages={this.props.languages} />

        <div class="card-columns">
          { filteredSources
              .map(source => <Source key={source.id}
                                     id={source.id}
                                     name={source.name}
                                     selected={this.props.selectedSources.includes(source.id)}
                                     description={source.description}
                                     url={source.url} />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sourceFilters: state.SourceFilters,
  selectedSources: state.SelectedSources
});

const SourcesContainer = connect(mapStateToProps)(Sources);

export default SourcesContainer;
