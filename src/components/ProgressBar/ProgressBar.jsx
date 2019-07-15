import React, { Component } from 'react'

class ProgressBar extends Component {
  render() {
    const {
      items, progressMax, noData
    } = this.props

    return (
      <div id="reactable-progress-bar">
        {progressMax === 0 && items.length === 0 && !noData && <span className="r-icon-spin6 animate-spin" /> }
        {(items.length < progressMax) && <progress max={progressMax} value={items.length}>{items.length}</progress>}
      </div>
    )
  }
}

export default ProgressBar
