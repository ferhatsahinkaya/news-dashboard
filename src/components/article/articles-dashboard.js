import { connect } from "react-redux"
import React from 'react'
import Articles from './articles'

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY)
const articleRetriever = [ { filter: 'top-headlines', retriever: newsapi.v2.topHeadlines },
                           { filter: 'everything', retriever: newsapi.v2.everything } ]

export class ArticlesDashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      articles: []
    }
  }

  retrieveArticles = (page) => {
    articleRetriever.find(retriever => retriever.filter === this.props.articleType).retriever({
      sources: this.props.sources.join(','),
      from: '2018-04-02',
      page: page
    })
    .then(response => {
      if(this.state.articleType === this.props.articleType) {
        this.setState({
          articles: this.state.articles.concat(response.articles)
        }, () => {
          if(response.articles.length > 0) {
            this.retrieveArticles(page+1)
          }
        })
      }
    })
  }

  render() {
    if(this.state.articleType !== this.props.articleType) {
      this.setState({
        articleType: this.props.articleType,
        articles: []
      }, () => this.retrieveArticles(1))
    }

    return (
      <div>
        <Articles articles={this.state.articles} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  articleType: state.ArticleFilters.find(filter => filter.type === 'level').filterValue
})

const ArticlesDashboardContainer = connect(mapStateToProps)(ArticlesDashboard)

export default ArticlesDashboardContainer
