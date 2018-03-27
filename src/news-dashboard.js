import { connect } from "react-redux"
import React from 'react'

class NewsDashboard extends React.Component {
  constructor() {
    super()
  }

  render() {
    alert('News Dashboard Render')
    return ( <div class={this.props.selected ? 'card selected' : 'card notselected'} onClick={() => this.props.clickSource(this.props.id)}>
      <div class="card-header">
        <div class="card-title">
          <a href={this.props.url} class="btn btn-link" target="_blank">{this.props.name}</a>
        </div>
      </div>
      <div class="card-body">
        <div class="card-text">{this.props.description}</div>
      </div>
    </div> )
  }
}

const mapStateToProps = state => ({
  sourceFilters: state.SourceFilters
})

const NewsDashboardContainer = connect(mapStateToProps)(NewsDashboard)

export default NewsDashboardContainer
