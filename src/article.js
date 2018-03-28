import React from 'react'

export default class Article extends React.Component {
  render() {
    return (
      <div class='card'>
        {this.props.urlToImage ? <img class="card-img-top" src={this.props.urlToImage} alt=''/> : ''}

        <div class="card-header">
          <div class="card-title">
            <a href={this.props.url} class="btn btn-link" target="_blank">{this.props.title}</a>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">{this.props.description}</div>
        </div>
        <div class="card-footer">
          <small class="text-muted">Published {this.getTimeDiffFromNow(this.props.publishedAt)} minutes ago by {this.props.author}</small>
        </div>
      </div>
    )
  }

  getTimeDiffFromNow(instant) {
    let durationInSeconds = Math.round((new Date().getTime() - new Date(instant).getTime()) / 1000)
    let hours = Math.floor(durationInSeconds / 3600)
    let minutes = Math.floor((durationInSeconds / 60) - (60 * hours))
    let seconds = Math.floor(durationInSeconds % 60)
    return ((hours > 0) ? hours + ' hours ' : '')
           + ((minutes > 0) ? minutes + ' minutes ' : '')
           + ((seconds > 0) ? seconds + ' seconds ' : '');
  }
}
