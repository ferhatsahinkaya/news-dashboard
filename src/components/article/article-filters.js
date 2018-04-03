import { connect } from "react-redux"
import React from 'react'
import Select from 'react-select'
import { filterArticle } from '../../actions'

const capitalizeFirstLetter = value => !value || value.charAt(0).toUpperCase() + value.slice(1)

const valueToLabelValuePair = value => {
  let obj = {}
  obj['value'] = value
  obj['label'] = capitalizeFirstLetter(value)
  return obj
}

const convertToValuePair = values => values.map(valueToLabelValuePair)
const levels = ['top headlines', 'everything']

export class ArticleFilters extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="form-group row mt-2">
          <input type="text" className="form-control form-control-lg" placeholder="Keyword" onChange={event => this.props.filterArticle('keyword', event.target.value)}/>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <Select id="level-filter" value={valueToLabelValuePair(this.props.levelFilterValue)} onChange={filter => this.props.filterArticle('level', filter.value)} options={convertToValuePair(levels)}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  levelFilterValue: state.ArticleFilters.find(filter => filter.type === 'level').filterValue
})

const mapDispatchToProps = {
  filterArticle
}

const ArticleFiltersContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleFilters)

export default ArticleFiltersContainer
