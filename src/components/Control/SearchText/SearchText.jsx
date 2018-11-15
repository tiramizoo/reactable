import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import { searching } from '../../../actions/search'

class SearchText extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByText = debounce((query) => {
    searching({query, store: this.context.store})
  }, 300)

  newSearchQuery(param) {
    const { column, searchQuery } = this.props
    return Object.assign({}, searchQuery[column], { ...param, column })
  }

  handleTextChange(e) {
    this.searchByText(this.newSearchQuery({ value: e.target.value }))
  }

  handleOptionsChange(e) {
    this.searchByText(this.newSearchQuery({ options: e.target.value }))
  }

  render() {
    const { column } = this.props
    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <input onChange={(e) => this.handleTextChange(e)} type="search" placeholder={column} id={column} />
        <select onChange={(e) => this.handleOptionsChange(e)}>
          <option value="all">All</option>
          <option value="exact">Exact</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
      </div>
    )
  }
}

export default SearchText
