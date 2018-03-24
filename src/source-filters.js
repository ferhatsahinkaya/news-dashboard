import { connect } from "react-redux"
import React from 'react'
import Select from 'react-select'
import { filterByName, filterByCategory, filterByLanguage } from './actions'
import Source from './source'

const capitalizeFirstLetter = value => !value || value.charAt(0).toUpperCase() + value.slice(1)

const valueToLabelValuePair = value => {
  let obj = {}
  obj['value'] = value
  obj['label'] = capitalizeFirstLetter(value)
  return obj
}

const filter = (filter, extractor) => source => extractor(source).toLowerCase().indexOf(filter.toLowerCase()) >= 0
const isFilterSet = (filter, defaultValue) => filter && (filter !== defaultValue)

const filterBy = theFilter => sources =>
  isFilterSet(theFilter.filter, theFilter.defaultValue) ?
    sources.filter(filter(theFilter.filter, theFilter.extractor)) :
    sources.slice(0)

const convertToValuePair = values => values.map(valueToLabelValuePair)

export class SourceFilters extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="container">
        <div class="form-group row mt-2">
          <input type="text" className="form-control form-control-lg" placeholder="Source" onChange={event => this.props.filterByName(event.target.value)}/>
        </div>
        <div class="form-group row">
          <label for="category-filter" class="col-2 col-form-label">Category:</label>
          <div class="col-10">
            <Select id="category-filter" value={valueToLabelValuePair(this.props.categoryFilterValue)} onChange={filter => this.props.filterByCategory(filter.value)} options={convertToValuePair(this.props.categories)}/>
          </div>
        </div>
        <div class="form-group row">
          <label for="language-filter" class="col-2 col-form-label">Language:</label>
          <div class="col-10">
            <Select id="language-filter" value={valueToLabelValuePair(this.props.languageFilterValue)} onChange={filter => this.props.filterByLanguage(filter.value)} options={convertToValuePair(this.props.languages)}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categoryFilterValue: state.SourceFilters.find(filter => filter.type === 'category').filterValue,
  languageFilterValue: state.SourceFilters.find(filter => filter.type === 'language').filterValue
})

const mapDispatchToProps = {
  filterByName,
  filterByCategory,
  filterByLanguage
}

const SourceFiltersContainer = connect(mapStateToProps, mapDispatchToProps)(SourceFilters)

export default SourceFiltersContainer
