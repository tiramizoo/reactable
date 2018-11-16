import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
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

    let newValue
    let newSearchQuery

    if (searchQuery[column]) {
      newValue = Object.assign({}, searchQuery[column].value, { [name]: n(value).value() || '' })
      newSearchQuery = Object.assign({}, searchQuery[column], { value: newValue, column })
      this.setState({ value: newValue })
    } else {
      newValue = { [name]: n(value).value() || '' }
      newSearchQuery = { value: newValue, column }
      this.setState({ value: newValue })
    }

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
        <br />
        <input
          value={from}
          onChange={(e) => this.handleNumberChange(e)}
          name="from"
          type="number"
          placeholder="from"
          id={column}
        />
        <input
          value={to}
          onChange={(e) => this.handleNumberChange(e)}
          name="to"
          type="number"
          placeholder="to"
          id={column}
        />
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchInteger
