import BlogNavigation from './blog-navigation'
import SourceDashboard from './source-dashboard'
import ArticlesDashboard from './articles-dashboard'
import React from 'react'

export default class NewsBlog extends React.Component {
  render() {
    return (
      <div>
        <BlogNavigation />
        <ArticlesDashboard sources={['bbc-news']} />
      </div>
    )
  }
}
