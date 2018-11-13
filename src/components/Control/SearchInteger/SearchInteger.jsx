import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import n from 'numeral'

import { searching } from '../../../actions/search'


class SearchInteger extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByNumber = debounce((query) => {
    searching({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, searchQuery } = this.props

    let newValue
    let newSearchQuery

    if (searchQuery[column]) {
      newValue = Object.assign({}, searchQuery[column].value, { [name]: n(value).value() })
      newSearchQuery = Object.assign({}, searchQuery[column], { value: newValue, column })
    } else {
      newValue = { [name]: n(value).value() }
      newSearchQuery = { value: newValue, column }
    }

    this.searchByNumber(newSearchQuery)
  }

  render() {
    const { column } = this.props
    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <input onChange={(e) => this.handleNumberChange(e)} name="from" type="number" placeholder="from" id={column} />
        <input onChange={(e) => this.handleNumberChange(e)} name="to" type="number" placeholder="to" id={column} />
      </div>
    )
  }
}

export default SearchInteger
