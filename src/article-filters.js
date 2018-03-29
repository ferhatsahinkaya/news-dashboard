import { connect } from "react-redux"
import React from 'react'
import { filterArticle } from './actions'

export class ArticleFilters extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="form-group row mt-2">
          <input type="text" className="form-control form-control-lg" placeholder="Keyword" onChange={event => this.props.filterArticle('name', event.target.value)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  filterArticle
}

const ArticleFiltersContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleFilters)

export default ArticleFiltersContainer
