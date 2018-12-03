import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import { searchingAnd } from '../../../actions/search'

const initState = {
  value: '',
  options: 'all',
}

class SearchText extends Component {
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

  searchByText = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  newSearchQuery(param) {
    const { column, searchQueryAnd } = this.props
    if (isEmpty(param.value) && (isEmpty(param.options) || param.options === initState.options)) {
      return {[column]: {}}
    }
    return {[column]: Object.assign({}, searchQueryAnd[column], { ...param })}
  }

  handleTextChange(e) {
    const params = { value: e.target.value }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleOptionsChange(e) {
    const params = { options: e.target.value }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByNumber({[column]: {}})
  }

  render() {
    const { column } = this.props
    const { value, options } = this.state

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <input
          value={value}
          onChange={(e) => this.handleTextChange(e)}
          type="text"
          placeholder={column}
          autoComplete="off"
          id={column}
        />
        <select
          value={options}
          onChange={(e) => this.handleOptionsChange(e)}
        >
          <option value="all">All</option>
          <option value="equal">Equal</option>
          <option value="notEqual">Not Equal</option>
          <option value="match">Match</option>
          <option value="notMatch">Not Match</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchText
