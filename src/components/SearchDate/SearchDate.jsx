import React from 'react'
import debounce from 'lodash/debounce'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

import searching from '../../helpers/searching'

const SearchDate = (props) => {
  const {
    updateViewport, setFilteredItems, setSearchQuery,
    search, column, items, limit, offset, schema,
  } = props

  const updateFilteredItems = (newFilteredItems) => {
    setFilteredItems(newFilteredItems)
    updateViewport(newFilteredItems, limit, offset)
  }

  const searchByNumber = debounce((newParams, searchQuery) => {
    setSearchQuery(column, newParams)
    const filteredItems = searching(items, searchQuery, schema)
    updateFilteredItems(filteredItems)
  })

  const handleNumberChange = (e) => {
    const { value, name } = e.target
    let newValue = { [name]: isEmpty(value) ? null : moment(value) }
    if (search[column]) {
      newValue = Object.assign({}, search[column].value, { [name]: isEmpty(value) ? null : moment(value)  })
    }

    const newParams = Object.assign({}, search[column], { value: newValue })
    const searchQuery = Object.assign({}, search, { [column]: newParams })
    searchByNumber(newParams, searchQuery)
  }

  return (
    <div>
      <label htmlFor={column}>{column}</label>
      <br />
      <input onChange={handleNumberChange} name="from" type="date" placeholder="from" id={column} />
      <input onChange={handleNumberChange} name="to" type="date" placeholder="to" id={column} />
    </div>
  )
}

export default SearchDate
