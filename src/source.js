import { connect } from "react-redux";
import React from 'react';

import { clickSource } from './actions'

export class Source extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.clickSource(this.props.id, !this.props.selected);
  }

  render() {
    return (
      <div class={this.props.selected ? 'card selected' : 'card notselected'} onClick={this.onClick}>
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

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {
  clickSource
};

const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
