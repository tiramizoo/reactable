import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import { searching } from '../../../actions/search'

class SearchDateTime extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByNumber = debounce((searchQuery) => {
    searching({searchQuery, store: this.context.store})
  })

  handleNumberChange = (e) => {
    const { value, name } = e.target
    const { column } = this.props

    let newValue = { [name]: isEmpty(value) ? null : Date.parse(value) }
    if (search[column]) {
      newValue = Object.assign({}, search[column].value, { [name]: isEmpty(value) ? null : Date.parse(value) })
    }

    const newOptions = Object.assign({}, search[column], { value: newValue, column })
    this.searchByNumber(searchQuery)
  }

  render() {
    const { column } = this.props
    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <input onChange={(e) => this.handleNumberChange(e)} name="from" type="datetime-local" placeholder="from" id={column} />
        <input onChange={(e) => this.handleNumberChange(e)} name="to" type="datetime-local" placeholder="to" id={column} />
      </div>
    )
  }
}

export default SearchDateTime
