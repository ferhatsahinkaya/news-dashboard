import { connect } from "react-redux"
import React from 'react'
import Articles from './articles'
import myData from './static_news.json'

// const NewsAPI = require('newsapi')
// const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY)

const staticDataRetriever = {
  then: function(method) {
    method(myData)
  }
}

const articleRetriever = [ { filter: 'top-headlines',
                             retriever: (page, props) => staticDataRetriever },
                             /* newsapi.v2.topHeadlines({ sources: props.sources.join(','),
                                                                                   page: page }) }, */
                           { filter: 'everything',
                             retriever: (page, props) => staticDataRetriever }

                             /* newsapi.v2.everything({ sources: props.sources.join(','),
                                                                                 from: props.fromDate,
                                                                                 to: props.toDate,
                                                                                 page: page }) } */ ]

export class ArticlesDashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      articles: []
    }
  }

  hasFilterChanged = () => (this.state.articleType !== this.props.articleType)
                            || (this.state.fromDate !== this.props.fromDate)
                            || (this.state.toDate !== this.props.toDate)

  retrieveArticles = (page) => {
    articleRetriever.find(retriever => retriever.filter === this.props.articleType).retriever(page, this.props)
    .then(response => {
      if(!this.hasFilterChanged()) {
        this.setState({
          articles: this.state.articles.concat(response.articles)
        }, () => {
          if(response.articles.length > 0 && page < 10) {
            this.retrieveArticles(page+1)
          }
        })
      }
    })
  }

  render() {
    if(this.hasFilterChanged()) {
      this.setState({
        articleType: this.props.articleType,
        fromDate: this.props.fromDate,
        toDate: this.props.toDate,
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
  articleType: state.ArticleFilters.find(filter => filter.type === 'level').filterValue,
  fromDate: state.ArticleFilters.find(filter => filter.type === 'fromDate').filterValue,
  toDate: state.ArticleFilters.find(filter => filter.type === 'toDate').filterValue
})

const ArticlesDashboardContainer = connect(mapStateToProps)(ArticlesDashboard)

export default ArticlesDashboardContainer
