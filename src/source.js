import { connect } from "react-redux";
import React from 'react';

import { selectSource, deselectSource } from './actions'

export class Source extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   selected: props.selected
    // }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.selected ?
        this.props.deselectSource(this.props.id) :
        this.props.selectSource(this.props.id);
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

const mapStateToProps = (state, ownProps) => ({
  selected: state.sourceSelection.selected
});

const mapDispatchToProps = {
  selectSource,
  deselectSource
};

const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
