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
  to: '',
  currentTimezone: ''
}

class SearchDateTime extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      const newInit = { currentTimezone: this.props.displayTimeZone }
      const searchValue = searchQueryAnd[column].value
      if (searchValue && searchValue.from) {
        newInit.from = searchValue.from.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      if (searchValue && searchValue.to) {
        newInit.to = searchValue.to.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      this.state = newInit
    } else {
      this.state = Object.assign({}, initState, { currentTimezone: this.props.displayTimeZone })
    }
  }

  componentDidUpdate() {
    const { from, to, currentTimezone } = this.state
    const { displayTimeZone } = this.props

    if (displayTimeZone !== currentTimezone) {
      let newFrom = isEmpty(from) ? '' : DateTime.fromFormat(from, 'yyyy-MM-dd HH:mm:ss', {zone: currentTimezone}).setZone(displayTimeZone).toFormat('yyyy-MM-dd HH:mm:ss')
      let newTo = isEmpty(to) ? '' : DateTime.fromFormat(to, 'yyyy-MM-dd HH:mm:ss', {zone: currentTimezone}).setZone(displayTimeZone).toFormat('yyyy-MM-dd HH:mm:ss')

      this.setState({ from: newFrom, to: newTo, currentTimezone: displayTimeZone })
    }

  }

  datePickerFormat() {
    const format = new Intl.DateTimeFormat().formatToParts(new Date());

    // https://flatpickr.js.org/formatting/
    return format.map(obj => {
      switch (obj.type) {
        case "day":
          return "d";
        case "month":
          return "m";
        case "year":
          return "Y";
        default:
          return obj.value;
      }
    }).join("") + ", H:i:S"
  }

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  handleNumberChange = (e, value, name) => {
    const { column, searchQueryAnd, displayTimeZone } = this.props

    let newValue = { [name]: isEmpty(value) ? null : DateTime.fromFormat(value, 'yyyy-MM-dd hh:mm:ss', {zone: displayTimeZone}).toUTC() }

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

    this.setState(initState)
    this.searchByNumber({[column]: {}})
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
            onClose={(e, str) => this.handleNumberChange(e, str, 'from')}
            options={{maxDate: to, enableTime: true, time_24hr: true, enableSeconds: true, altInput: true, altFormat: this.datePickerFormat()}}
            name="from"
            placeholder="from"
          />
          <Flatpickr
            value={to}
            onClose={(e, str) => this.handleNumberChange(e, str, 'to')}
            options={{minDate: from, enableTime: true, time_24hr: true, enableSeconds: true, altInput: true, altFormat: this.datePickerFormat()}}
            name="to"
            placeholder="to"
          />
        </div>
      </div>
    )
  }
}

export default SearchDateTime
