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


  handleTextChange(e) {
    const { column, searchQuery } = this.props

    const newSearchQuery = Object.assign({}, searchQuery[column], { value: e.target.value, column })
    this.searchByText(newSearchQuery)
  }

  handleOptionsChange(e) {
    const { column, searchQuery } = this.props
    const newSearchQuery = Object.assign({}, searchQuery[column], { options: e.target.value, column })
    this.searchByText(newSearchQuery)
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
