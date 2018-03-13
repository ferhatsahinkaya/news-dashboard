import React from 'react';

export default class Source extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      cardStyle: this.getCardStyle(props.selected)
    }
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardStyle: this.getCardStyle(nextProps.selected)
    });
  }

  getCardStyle(value) {
    return value ? 'card selected' : 'card notselected';
  }

  onClick() {
    this.setState({
        selected : !this.state.selected,
        cardStyle: this.getCardStyle(!this.state.selected)
    }, () => this.state.selected ? this.props.selectedCallback(this.props.id) : this.props.deselectedCallback(this.props.id) );
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
