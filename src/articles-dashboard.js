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
    newsapi.v2.topHeadlines({
      sources: this.props.sources
    })
    .then(response => {
      this.setState({
        articles: response.articles
      })
    })
  }

  render() {
    return (
      <div>
        <Articles articles={this.state.articles} />
      </div>
    )
  }
}
