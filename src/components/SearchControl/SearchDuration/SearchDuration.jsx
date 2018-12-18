import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import omit from 'lodash/omit'
import isNumber from 'lodash/isNumber'
import { Duration } from 'luxon'

import { searchingAnd } from '../../../actions/search'

const initState = {
  from: {
    years: '',
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  },
  to: {
    years: '',
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  }
}

class SearchDuration extends Component {
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

  searchByNumber = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  isEmpty = (obj) => {
    return !obj.years && !obj.months && !obj.days && !obj.hours && !obj.minutes && !obj.seconds
  }

  handleNumberChange = (e, range) => {
    const { value, name } = e.target
    const { column, searchQueryAnd } = this.props

    let { from, to } = this.state
    let newValue = {}
    if (range === 'from') {
      from = Object.assign({}, from, { [name]: Number(value) || '' })
      this.setState({ from: from })
      if (this.isEmpty(from)) {
        newValue = { from: {}}
      } else {
        newValue = { from: Duration.fromObject(from) }
      }
    }
    if (range === 'to') {
      to = Object.assign({}, to, { [name]: Number(value) || '' })
      this.setState({ to: to })
      if (this.isEmpty(to)) {
        newValue = { to: {}}
      } else {
        newValue = { to: Duration.fromObject(to) }
      }
    }

    let newSearchQuery = {[column]: { value: newValue }}

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue)
      newSearchQuery = {[column]: { value: newValue }}
    }

    console.log('A: ', newValue.from, newValue.to.valueOf())
    // // console.log('BB: ', Duration.isDuration(newValue.from))
    // console.log('CC: ', Duration.isDuration(newValue.to))
    // console.log('C: ', !newValue.from, !newValue.to)

    if (!newValue.from && !newValue.to) {
      newSearchQuery =  {[column]: {}}
    }

    console.log('A: ', newValue)
    console.log('B: ', newSearchQuery)
    console.log('C: ', from)
    console.log('D: ', to)
    this.searchByNumber(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByNumber({[column]: {}})
  }

  render() {
    const { column } = this.props
    const { from, to } = this.state

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <input
          value={from.years}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="years"
          type="number"
          placeholder="from years"
          autoComplete="off"
          id={`from_years-${column}`}
        />
        <input
          value={from.months}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="months"
          type="number"
          placeholder="from months"
          autoComplete="off"
          id={`from_months-${column}`}
        />
        <input
          value={from.days}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="days"
          type="number"
          placeholder="from days"
          autoComplete="off"
          id={`from_days-${column}`}
        />
        <input
          value={from.hours}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="hours"
          type="number"
          placeholder="from hours"
          autoComplete="off"
          id={`from_hours-${column}`}
        />
        <input
          value={from.minutes}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="minutes"
          type="number"
          placeholder="from minutes"
          autoComplete="off"
          id={`from_minutes-${column}`}
        />
        <input
          value={from.seconds}
          onChange={(e) => this.handleNumberChange(e, 'from')}
          name="seconds"
          type="number"
          placeholder="from seconds"
          autoComplete="off"
          id={`from_seconds-${column}`}
        />


        <input
          value={to.years}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="years"
          type="number"
          placeholder="to years"
          autoComplete="off"
          id={`to_years-${column}`}
        />
        <input
          value={to.months}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="months"
          type="number"
          placeholder="to months"
          autoComplete="off"
          id={`to_months-${column}`}
        />
        <input
          value={to.days}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="days"
          type="number"
          placeholder="to days"
          autoComplete="off"
          id={`to_days-${column}`}
        />
        <input
          value={to.hours}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="hours"
          type="number"
          placeholder="to hours"
          autoComplete="off"
          id={`to_hours-${column}`}
        />
        <input
          value={to.minutes}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="minutes"
          type="number"
          placeholder="to minutes"
          autoComplete="off"
          id={`to_minutes-${column}`}
        />
        <input
          value={to.seconds}
          onChange={(e) => this.handleNumberChange(e, 'to')}
          name="seconds"
          type="number"
          placeholder="to seconds"
          autoComplete="off"
          id={`to_seconds-${column}`}
        />

        <button onClick={() => this.handleClearChange()}>Clear</button>
      </div>
    )
  }
}

export default SearchDuration
