import React from 'react'
import Articles from './articles'

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY)

export default class ArticlesDashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    let retrieveArticlesStartingFromPage = (page) => {
      newsapi.v2.topHeadlines({
        sources: this.props.sources.join(','),
        page: page
      })
      .then(response => {
        this.setState({
          articles: this.state.articles.concat(response.articles)
        })

        if(response.articles.length > 0) {
          retrieveArticlesStartingFromPage(page+1)
        }
      })
    }

    retrieveArticlesStartingFromPage(1)
  }

  render() {
    return (
      <div>
        <Articles articles={this.state.articles} />
      </div>
    )
  }
}
