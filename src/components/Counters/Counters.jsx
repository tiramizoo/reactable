import React, { Component } from 'react'
const classNames = require('classnames')

class Counters extends Component {
  render() {
    const { filteredSchema, filteredItems, items, progressMax, noData } = this.props

    const isLoading = progressMax === 0 && items.length === 0 && !noData

    return (
      <div className={classNames('reactable-counters', { isLoading: isLoading })}>
        <span className="stats">
          {filteredItems.length} / {progressMax || items.length}
        </span>
        {items.length < progressMax && (
          <span className="meter" style={{ width: `${(items.length / progressMax) * 100}%` }}></span>
        )}
      </div>
    )
  }
}

export default Counters
