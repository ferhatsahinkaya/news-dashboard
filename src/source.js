import React from 'react';

export default class Source extends React.Component {
  constructor() {
    super();

    this.state = {
      selected : false,
      cardStyle : 'card notselected'
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        selected : !this.state.selected,
        cardStyle: !this.state.selected ? 'card selected' : 'card notselected'
    });
  }

  render() {
    return (
      <div class={this.state.cardStyle} onClick={this.onClick}>
        <div class="card-header">
          <div class="card-title">
            <a href={this.props.url} class="btn btn-link" target="_blank">{this.props.name}</a>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">{this.props.description}</div>
        </div>
      </div>
    )
  }
}
