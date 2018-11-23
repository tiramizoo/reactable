import React, { Component } from 'react'

import SearchText from '../SearchText'
import SearchBoolean from '../SearchBoolean'
import SearchInteger from '../SearchInteger'
import SearchDate from '../SearchDate'
import SearchDateTime from '../SearchDateTime'
import { clearAllSearchQuery } from '../../../actions/search'

class SearchList extends Component {
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
      case 'integer':
        return <SearchInteger column={column} key={clearAll} />
      case 'float':
        return <SearchInteger column={column} key={clearAll} />
      case 'date':
        return <SearchDate column={column} key={clearAll} />
      case 'datetime':
        return <SearchDateTime column={column} key={clearAll} />
      case 'time':
        return null
      default:
        return null
    }
  }

  hideColumn(schemaParams) {
    return (schemaParams['filter'] != 'undefined' && schemaParams['filter'] == false)
  }

  columnFilter(key, schemaParams) {
    if (this.hideColumn(schemaParams)) {
      return null
    }
    return <div key={key}>{this.getSearchInput(schemaParams.type, key)}</div>
  }

  handleClearAllChange() {
    const { clearAll } = this.state

    this.setState({ clearAll: clearAll + 1 })
    this.props.clearAllSearchQuery()
  }

  render() {
    const { filteredSchema } = this.props

    return (
      <div>
        <button onClick={() => this.handleClearAllChange()}>Clear all</button>
          { Object.entries(filteredSchema).map(([key, keySchema]) =>
          this.columnFilter(key, keySchema)
          )}
      </div>
    )
  }
}

export default SearchList
