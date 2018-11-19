import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import { searching } from '../../../actions/search'

const initState = {
  value: { from: '', to: '' }
}

class SearchDate extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = initState
  }

  searchByNumber = debounce((query) => {
    searching({query, store: this.context.store})
  })

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, searchQuery } = this.props
    this.setState({ value: {[name]: value }})

    let newValue = { [name]: isEmpty(value) ? null : Date.parse(value) }
    if (searchQuery[column]) {
      newValue = Object.assign({}, searchQuery[column].value, { [name]: isEmpty(value) ? null : Date.parse(value)  })
    }
    const newSearchQuery = Object.assign({}, searchQuery[column], { value: newValue, column })
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
