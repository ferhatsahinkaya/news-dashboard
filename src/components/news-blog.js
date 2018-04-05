import { connect } from 'react-redux'
import React from 'react'
import BlogNavigation from './blog-navigation'
import SourceDashboard from './source/source-dashboard'
import ArticlesDashboard from './article/articles-dashboard'

const router = [
  { page: 'sources', render: props => <SourceDashboard/> },
  { page: 'articles', render: props => <ArticlesDashboard sources={props.selectedSources} /> }
]

export class NewsBlog extends React.Component {
  render() {
    let pageRenderer = router.find(route => route.page === this.props.page)

    return (
      <div>
        <BlogNavigation selected={this.props.page}/>
        {pageRenderer.render(this.props)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  page: state.BlogNavigation.page,
  selectedSources: state.SelectedSources
})

const NewsBlogContainer = connect(mapStateToProps)(NewsBlog)

export default NewsBlogContainer
