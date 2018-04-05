import { connect } from "react-redux"
import React from 'react'

import { goToPage } from '../actions'

export class BlogNavigation extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#sources" onClick={() => this.props.goToPage('sources')}>News Blog</a>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class={this.props.selected === 'sources' ? "nav-item active" : "nav-item"} onClick={() => goToPage('sources')}>
                <a class="nav-link" href="#sources" onClick={() => this.props.goToPage('sources')}>Sources</a>
              </li>
              <li class={this.props.selected === 'articles' ? "nav-item active" : "nav-item"}>
                <a class="nav-link" href="#articles" onClick={() => this.props.goToPage('articles')}>Articles</a>
            </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  goToPage
}

const BlogNavigationContainer = connect(mapStateToProps, mapDispatchToProps)(BlogNavigation)

export default BlogNavigationContainer
