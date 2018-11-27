import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import omit from 'lodash/omit'
import n from 'numeral'

import { searching } from '../../../actions/search'

const initState = {
  value: { from: '', to: '' }
}

class SearchInteger extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = initState
  }

  searchByNumber = debounce((query) => {
    searching({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, searchQuery } = this.props

    let newValue = { [name]: n(value).value() || '' }
    let newSearchQuery = { value: newValue, column }

    if (searchQuery[column]) {
      newValue = Object.assign({}, searchQuery[column].value, { [name]: n(value).value() || '' })
      newSearchQuery = Object.assign({}, searchQuery[column], { value: newValue, column })
    }
    if (!isNumber(newValue.from) && !isNumber(newValue.to)) {
      newSearchQuery =  Object.assign({}, {column}, omit(searchQuery, column))
    }
    this.setState({ value: newValue })
    this.searchByNumber(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByNumber({ column })
  }

  render() {
    const { column } = this.props
    const { from, to } = this.state.value

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <input
          value={from}
          onChange={(e) => this.handleNumberChange(e)}
          name="from"
          type="number"
          placeholder="from"
          autoComplete="off"
          id={column}
        />
        <input
          value={to}
          onChange={(e) => this.handleNumberChange(e)}
          name="to"
          type="number"
          placeholder="to"
          autoComplete="off"
          id={column}
        />
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchInteger
