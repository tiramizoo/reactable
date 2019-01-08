import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import isNumber from 'lodash/isNumber'
import Flatpickr from 'react-flatpickr'
import { DateTime } from 'luxon'
import 'flatpickr/dist/flatpickr.css'

import { searchingAnd } from '../../../actions/search'

const initState = {
  from: '',
  to: ''
}

class SearchDateTime extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      const newInit = initState
      const searchValue = searchQueryAnd[column].value
      if (searchValue && searchValue.from) {
        newInit.from = searchValue.from.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      if (searchValue && searchValue.to) {
        newInit.to = searchValue.to.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      this.state = newInit
    } else {
      this.state = initState
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e, value, name) => {
    const { column, searchQueryAnd } = this.props

    let newValue = { [name]: isEmpty(value) ? null : DateTime.fromFormat(value, 'yyyy-MM-dd hh:mm:ss') }
    this.setState({ [name]: isEmpty(value) ? null : value })

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue)
    }
    let newSearchQuery = {[column]: Object.assign({}, searchQueryAnd[column], { value: newValue })}
    if (!newValue.from && !newValue.to) {
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
    const { column, schema } = this.props
    const { from, to } = this.state

    return (
      <div className='SearchDateTime'>
        <div className='attribute'>
          {schema[column].label || column}
          <button className='clear' onClick={() => this.handleClearChange()}></button>
        </div>

        <div className='attribute-filter'>
          <Flatpickr
            value={from}
            onChange={(e, str) => this.handleNumberChange(e, str, 'from')}
            onClose={(e, str) => this.handleNumberChange(e, str, 'from')}
            options={{maxDate: to, enableTime: true, time_24hr: true, enableSeconds: true}}
            name="from"
            placeholder="from"
          />
          <Flatpickr
            value={to}
            onChange={(e, str) => this.handleNumberChange(e, str, 'to')}
            onClose={(e, str) => this.handleNumberChange(e, str, 'to')}
            options={{minDate: from, enableTime: true, time_24hr: true, enableSeconds: true}}
            name="to"
            placeholder="to"
          />
        </div>
      </div>
    )
  }
}

export default SearchDateTime
