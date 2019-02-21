import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'


import SearchText from './SearchText'
import SearchBoolean from './SearchBoolean'
import SearchNumber from './SearchNumber'
import SearchDate from './SearchDate'
import SearchDateTime from './SearchDateTime'
import SearchTime from './SearchTime'
import SearchDuration from './SearchDuration'
import { searchingAnd } from '../../actions/search'
import { queryDataType } from '../../helpers/utilities'

class SearchControl extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      clearAll: 0,
      searchPreset: props.defaultSearchPreset || "",
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
        return <SearchDuration column={column} key={clearAll} />
      default:
        return null
    }
  }

  columnFilter(key, schemaParams) {
    if (schemaParams.filter !== undefined && schemaParams.filter === false) {
      return null
    }
    return (
      <div className='filter' key={key}>
        {this.getSearchInput(schemaParams.type, key)}
      </div>
    )
  }

  handleClearAllChange() {
    const { clearAll } = this.state
    const { clearAllSearchQuery } = this.props

    this.setState({ clearAll: clearAll + 1, searchPreset: '' })
    clearAllSearchQuery()
  }

  handleSearchPresetsChange(name) {
    this.handleClearAllChange()
    const { searchPresets, schema } = this.props
    this.setState({ searchPreset: name })

    if (name) {
      const query = searchPresets[name]
      const newQuery = queryDataType(query, schema)

      searchingAnd({ query: newQuery, store: this.context.store })
    }
  }

  renderSearchPresets() {
    const { searchPresets } = this.props
    const { searchPreset } = this.state
    if (isEmpty(searchPresets)) {
      return null
    }

    return (
      <select
        value={searchPreset}
        onChange={(e) => this.handleSearchPresetsChange(e.target.value)}
      >
        <option value="" key="empty">---</option>
        { Object.keys(searchPresets).map(key => <option value={key} key={key}>{key}</option>) }
      </select>
    )
  }

  render() {
    const { tableWidth, schema } = this.props

    return (
      <div className="SearchControl">
        <div className='search-presets'>
          <div className='search-presets-dropdown'>
            { this.renderSearchPresets() }
          </div>
          <div className='search-presets-reset'>
            <button className='clear-all' onClick={() => this.handleClearAllChange()}>Reset</button>
          </div>
        </div>
        { Object.entries(schema).map(([key, keySchema]) => {
          return this.columnFilter(key, keySchema)
        })}
      </div>
    )
  }
}

export default SearchControl
