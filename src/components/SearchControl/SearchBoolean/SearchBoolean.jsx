import React, { Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import { searching } from '../../../actions/search'

const initState = {
  value: 'all'
}

class SearchBoolean extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQuery } = props
    if (searchQuery[column]) {
      this.state = searchQuery[column]
    } else {
      this.state = initState
    }
  }

  searchByBoolean = debounce((query) => {
    searching({query, store: this.context.store})
  })

  handleValueChange = (e) => {
    const { column, searchQuery } = this.props
    const { value } = e.target

    let newSearchQuery = Object.assign({}, searchQuery[column], { value: value, column })
    if (isEmpty(value) || value === 'all') {
      newSearchQuery = Object.assign({}, {column}, omit(searchQuery, column))
    }
    this.setState({ value })
    this.searchByBoolean(newSearchQuery)
  }

  render() {
    const { column } = this.props
    const { value } = this.state

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <select value={value} onChange={(e) => this.handleValueChange(e)}>
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
      </div>
    )
  }
}

export default SearchBoolean
