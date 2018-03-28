import React from 'react'

export default class Article extends React.Component {
  render() {
    return (
      <div class='card'>
        {this.props.urlToImage ?
          <img class="card-img-top" src={this.props.urlToImage} alt=''/> : ''}

        <div class="card-header">
          <div class="card-title">
            <a href={this.props.url} class="btn btn-link" target="_blank">{this.props.title}</a>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">{this.props.description}</div>
        </div>
        <div class="card-footer">
          <small class="text-muted">Published at {this.props.publishedAt} by {this.props.author}</small>
        </div>
      </div>
    )
  }
}
