import { connect } from "react-redux"
import React from 'react'
import Articles from './articles'

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY)

export class ArticlesDashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      articleFilters: [],
      articles: []
    }
  }

  retrieveArticles = (page, filters) => {
    newsapi.v2.topHeadlines({
      sources: this.props.sources.join(','),
      q: filters[0].filterValue,
      page: page
    })
    .then(response => {
      if(JSON.stringify(filters) === JSON.stringify(this.props.articleFilters)) {
        this.setState({
          articles: this.state.articles.concat(response.articles)
        }, () => {
          if(response.articles.length > 0) {
            this.retrieveArticles(page+1, filters)
          }
        })
      }
    })
  }

  render() {
    if(JSON.stringify(this.state.articleFilters) !== JSON.stringify(this.props.articleFilters)) {
      this.setState({
        articleFilters: this.props.articleFilters,
        articles: []
      }, () => this.retrieveArticles(1, this.props.articleFilters))
    }

    return (
      <div>
        <Articles articles={this.state.articles} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  articleFilters: state.ArticleFilters
})

const ArticlesDashboardContainer = connect(mapStateToProps)(ArticlesDashboard)

export default ArticlesDashboardContainer
