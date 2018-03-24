import React from 'react'
import Sources from './sources'

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.REACT_APP_API_KEY)

const extractValues = (sources, values, extractor) => values.concat(sources
      .map(extractor)
      .filter((value, index, self) => self.indexOf(value) === index))

export default class SourceDashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      sources: [],
      categories: ['all'],
      languages: ['all']
    }
  }

  componentDidMount() {
    newsapi.v2.sources()
    .then(response => {
      this.setState({
        sources : response.sources,
        categories: extractValues(response.sources, this.state.categories, source => source.category),
        languages: extractValues(response.sources, this.state.languages, source => source.language)
      })
    })
  }

  render() {
    return (
      <div>
        <Sources sources={this.state.sources}
                 categories={this.state.categories}
                 languages={this.state.languages} />
      </div>
    )
  }
}
