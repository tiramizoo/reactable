import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import isNumber from 'lodash/isNumber'

import { searchingAnd } from '../../../actions/search'

const initState = {
  value: { from: '', to: '' }
}

class SearchDate extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      this.state = searchQueryAnd[column]
    } else {
      this.state = initState
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  })

  handleNumberChange = (e) => {
    const { value, name } = e.target
    console.log('v: ', value)
    const { column, searchQueryAnd } = this.props
    this.setState({ value: {[name]: value }})

    let newValue = { [name]: value }
    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue)
    }
    let newSearchQuery = {[column]: Object.assign({}, searchQueryAnd[column], { value: newValue })}
    if (!isEmpty(newValue.from) && !isEmpty(newValue.to)) {
      newSearchQuery =  {[column]: {}}
    }
    this.searchByNumber(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByNumber({[column]: {}})
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
          type="date"
          placeholder="from"
          autoComplete="off"
          id={column}
        />
        <input
          value={to}
          onChange={(e) => this.handleNumberChange(e)}
          name="to"
          type="date"
          placeholder="to"
          autoComplete="off"
          id={column}
        />
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchDate
