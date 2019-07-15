import React, { Component } from 'react'

class Counters extends Component {
  render() {
    const {
      filteredSchema, filteredItems, items, progressMax
    } = this.props

    return (
      <div className="reactable-counters">
        {filteredItems.length} / {progressMax || items.length}
      </div>
    )
  }
}

export default Counters
