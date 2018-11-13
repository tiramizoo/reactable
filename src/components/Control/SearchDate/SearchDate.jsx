import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import { searching } from '../../../actions/search'

class SearchDate extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByNumber = debounce((query) => {
    searching({query, store: this.context.store})
  })

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, searchQuery } = this.props

    let newValue = { [name]: isEmpty(value) ? null : Date.parse(value) }
    if (searchQuery[column]) {
      newValue = Object.assign({}, searchQuery[column].value, { [name]: isEmpty(value) ? null : Date.parse(value)  })
    }

    const newSearchQuery = Object.assign({}, searchQuery[column], { value: newValue, column })
    this.searchByNumber(newSearchQuery)
  }

  render() {
    const { column } = this.props
    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <input onChange={(e) => this.handleNumberChange(e)} name="from" type="date" placeholder="from" id={column} />
        <input onChange={(e) => this.handleNumberChange(e)} name="to" type="date" placeholder="to" id={column} />
      </div>
    )
  }
}

export default SearchDate
