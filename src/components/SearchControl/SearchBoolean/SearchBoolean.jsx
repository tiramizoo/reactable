import React, { Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import { searchingAnd } from '../../../actions/search'

const initState = {
  value: 'all'
}

class SearchBoolean extends Component {
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

  searchByBoolean = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  })

  handleValueChange = (e) => {
    const { column, searchQueryAnd } = this.props
    const { value } = e.target

    let newSearchQuery = {[column]: Object.assign({}, searchQueryAnd[column], { value: value, column })}
    if (isEmpty(value) || value === 'all') {
      newSearchQuery =  {[column]: {}}
    }
    this.setState({ value })
    this.searchByBoolean(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByBoolean({[column]: {}})
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
        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchBoolean
