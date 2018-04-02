import { connect } from "react-redux"
import React from 'react'
import ArticleFilters from './article-filters'
import Article from './article'

export class Articles extends React.Component {
  matchesKeyword(value) {
    return value.toLowerCase().indexOf(this.props.keyword.toLowerCase()) >= 0;
  }

  render() {
    return (
      <div>
        <ArticleFilters />

        <div class="card-columns">
          { this.props.articles
              .filter(article => this.matchesKeyword(article.title) || this.matchesKeyword(article.description))
              .map(article => <Article author={article.author}
                                       title={article.title}
                                       description={article.description}
                                       url={article.url}
                                       urlToImage={article.urlToImage}
                                       publishedAt={article.publishedAt}/>) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keyword: state.ArticleFilters
    .filter(filter => filter.type === 'keyword')
    .map(filter => filter.filterValue)[0]
})

const ArticlesContainer = connect(mapStateToProps)(Articles)

export default ArticlesContainer
