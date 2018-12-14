import React, { Component } from 'react'

import SearchText from './SearchText'
import SearchBoolean from './SearchBoolean'
import SearchNumber from './SearchNumber'
import SearchDate from './SearchDate'
import SearchDateTime from './SearchDateTime'
import SearchTime from './SearchTime'

class SearchControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clearAll: 0,
    }
  }

  getSearchInput(type, column) {
    const { clearAll } = this.state
    switch (type) {
      case 'text':
        return <SearchText column={column} key={clearAll} />
      case 'boolean':
        return <SearchBoolean column={column} key={clearAll} />
      case 'number':
        return <SearchNumber column={column} key={clearAll} />
      case 'date':
        return <SearchDate column={column} key={clearAll} />
      case 'datetime':
        return <SearchDateTime column={column} key={clearAll} />
      case 'time':
        return <SearchTime column={column} key={clearAll} />
      case 'duration':
        return null
      default:
        return null
    }
  }

  columnFilter(key, schemaParams) {
    if (schemaParams.filter !== undefined && schemaParams.filter === false) {
      return null
    }
    return <div key={key}>{this.getSearchInput(schemaParams.type, key)}</div>
  }

  handleClearAllChange() {
    const { clearAll } = this.state
    const { clearAllSearchQuery } = this.props

    this.setState({ clearAll: clearAll + 1 })
    clearAllSearchQuery()
  }

  handleToggleControl(e) {
    e.preventDefault()
    const { toggleSearchControl } = this.props
    toggleSearchControl()
  }

  render() {
    const { filteredSchema, controlShow, tableWidth } = this.props

    if (!controlShow) {
      return null
    }

    return (
      <div className="control box">
        <div className='header'>
          <h2>Search</h2>
          <button className='close'
            onClick={(e) => this.handleToggleControl(e)}
          ></button>
        </div>
        <div className='body'>
          <button onClick={() => this.handleClearAllChange()}>
            Clear all
          </button>

          { Object.entries(filteredSchema).map(([key, keySchema]) => {
            return this.columnFilter(key, keySchema)
          })}
        </div>
      </div>
    )
  }
}

export default SearchControl
