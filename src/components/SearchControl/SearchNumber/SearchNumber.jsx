import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import omit from 'lodash/omit'

import { searchingAnd } from '../../../actions/search'

const initState = {
  from: '',
  to: ''
}

class SearchNumber extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      this.state = searchQueryAnd[column].value
    } else {
      this.state = initState
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, searchQueryAnd } = this.props
    let newValue = { [name]: Number(value) || '' }
    let newSearchQuery = {[column]: { value: newValue }}

    this.setState(newValue)

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue)
      newSearchQuery = {[column]: { value: newValue }}
    }
    if (!isNumber(newValue.from) && !isNumber(newValue.to)) {
      newSearchQuery =  {[column]: {}}
    }

    this.searchByNumber(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.searchByNumber({[column]: {}})
    this.setState(initState)
  }

  render() {
    const { column } = this.props
    const { from, to } = this.state

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
          id={`from-${column}`}
        />
        <input
          value={to}
          onChange={(e) => this.handleNumberChange(e)}
          name="to"
          type="number"
          placeholder="to"
          autoComplete="off"
          id={`to-${column}`}
        />
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchNumber
