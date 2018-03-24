import { connect } from "react-redux"
import React from 'react'
import Select from 'react-select'
import { filterSource } from './actions'

const capitalizeFirstLetter = value => !value || value.charAt(0).toUpperCase() + value.slice(1)

const valueToLabelValuePair = value => {
  let obj = {}
  obj['value'] = value
  obj['label'] = capitalizeFirstLetter(value)
  return obj
}

const convertToValuePair = values => values.map(valueToLabelValuePair)

export class SourceFilters extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="form-group row mt-2">
          <input type="text" className="form-control form-control-lg" placeholder="Source" onChange={event => this.props.filterSource('name', event.target.value)}/>
        </div>
        <div class="form-group row">
          <label for="category-filter" class="col-2 col-form-label">Category:</label>
          <div class="col-10">
            <Select id="category-filter" value={valueToLabelValuePair(this.props.categoryFilterValue)} onChange={filter => this.props.filterSource('category', filter.value)} options={convertToValuePair(this.props.categories)}/>
          </div>
        </div>
        <div class="form-group row">
          <label for="language-filter" class="col-2 col-form-label">Language:</label>
          <div class="col-10">
            <Select id="language-filter" value={valueToLabelValuePair(this.props.languageFilterValue)} onChange={filter => this.props.filterSource('language', filter.value)} options={convertToValuePair(this.props.languages)}/>
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
  filterSource
}

const SourceFiltersContainer = connect(mapStateToProps, mapDispatchToProps)(SourceFilters)

export default SourceFiltersContainer
