import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import n from 'numeral'

import { searching } from '../../../actions/search'


class SearchInteger extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByNumber = debounce((searchQuery) => {
    searching({searchQuery, store: this.context.store})
  }, 300)

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column, filter } = this.props

    let newValue
    let searchQuery

    if (filter[column]) {
      newValue = Object.assign({}, filter[column].value, { [name]: n(value).value() })
      searchQuery = Object.assign({}, filter[column], { value: newValue, column })
    } else {
      newValue = { [name]: n(value).value() }
      searchQuery = { value: newValue, column }
    }

    this.searchByNumber(searchQuery)
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
