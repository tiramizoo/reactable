import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import { searching } from '../../../actions/search'

const initState = {
  value: '',
  options: 'all',
}

class SearchText extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = initState
  }

  searchByText = debounce((query) => {
    searching({query, store: this.context.store})
  }, 300)

  newSearchQuery(param) {
    const { column, searchQuery } = this.props
    return Object.assign({}, searchQuery[column], { ...param, column })
  }

  handleTextChange(e) {
    const params = { value: e.target.value }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleOptionsChange(e) {
    const params = { options: e.target.value }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByText({ column })
  }

  render() {
    const { column, searchQuery } = this.props
    const { value, options } = this.state

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <input
          value={value}
          onChange={(e) => this.handleTextChange(e)}
          type="text"
          placeholder={column}
          autoComplete="off"
          id={column}
        />
        <select
          value={options}
          onChange={(e) => this.handleOptionsChange(e)}
        >
          <option value="all">All</option>
          <option value="exact">Exact</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchText
