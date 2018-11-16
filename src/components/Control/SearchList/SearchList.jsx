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

  columnHeader(key) {
    const { schema } = this.props
    const schemaParams = schema[key]

    if ((schemaParams['filter'] != 'undefined' && schemaParams['filter'] == false) || (schemaParams['hide'] != 'undefined' && schemaParams['hide'] == true)) {
      return null
    }
    return <th key={key} width={schema[key]['width']}></th>
  }

  columnBody(key, schemaParams) {
    if ((schemaParams['filter'] != 'undefined' && schemaParams['filter'] == false) || (schemaParams['hide'] != 'undefined' && schemaParams['hide'] == true)) {
      return null
    }
    return <td key={key}>{this.getSearchInput(schemaParams.type, key)}</td>
  }

  handleClearAllChange() {
    const { clearAll } = this.state

    this.setState({ clearAll: clearAll + 1 })
    this.props.clearAllSearchQuery()
  }

  render() {
    const { schema } = this.props

    return (
      <div>
        <button onClick={() => this.handleClearAllChange()}>Clear all</button>
        <table>
          <thead>
            <tr>
              { Object.keys(schema).map(key =>
                  this.columnHeader(key),
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              { Object.entries(schema).map(([key, keySchema]) =>
                this.columnBody(key, keySchema),
              )}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchList
