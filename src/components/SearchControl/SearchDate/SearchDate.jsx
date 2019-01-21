import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import 'flatpickr/dist/flatpickr.css'

import Flatpickr from 'react-flatpickr'

import { searchingAnd } from '../../../actions/search'

const initState = {
   from: '',
   to: '',
}

class SearchDate extends Component {
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

  datePickerFormat() {
    const { format, separator } = this.props

    switch (format) {
      case 'eu':
        return `d${separator}m${separator}Y`
      case 'us':
        return `m${separator}d${separator}Y`
      default:
        return `Y${separator}m${separator}d`
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e, value, name) => {
    const { column, searchQueryAnd } = this.props
    let newValue = { [name]: value }
    this.setState(newValue)

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue)
    }
    let newSearchQuery = {[column]: Object.assign({}, searchQueryAnd[column], { value: newValue })}
    if (isEmpty(newValue.from) && isEmpty(newValue.to)) {
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
    const { column, schema } = this.props
    const { from, to } = this.state

    return (
      <div className='SearchDate'>
        <div className='attribute'>
          {schema[column].label || column}
          <button className='clear' onClick={() => this.handleClearChange()}></button>
        </div>

        <div className='attribute-filter'>
          <Flatpickr
            value={from}
            onClose={(e, str) => this.handleNumberChange(e, str, 'from')}
            options={{maxDate: to, altInput: true, altFormat: this.datePickerFormat()}}
            name="from"
            placeholder="from"
          />

          <Flatpickr
            value={to}
            onClose={(e, str) => this.handleNumberChange(e, str, 'to')}
            options={{minDate: from, altInput: true, altFormat: this.datePickerFormat()}}
            name="to"
            placeholder="to"
          />
        </div>
      </div>
    )
  }
}

export default SearchDate
