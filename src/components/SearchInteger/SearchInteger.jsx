import React from 'react'
import debounce from 'lodash/debounce'
import searching from '../../helpers/searching'
import n from 'numeral'

const SearchInteger = (props) => {
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
    let newValue = { [name]: n(value).value() }
    if (search[column]) {
      newValue = Object.assign({}, search[column].value, { [name]: n(value).value() })
    }

    const newParams = Object.assign({}, search[column], { value: newValue })
    const searchQuery = Object.assign({}, search, { [column]: newParams })
    searchByNumber(newParams, searchQuery)
  }

  return (
    <div>
      <label htmlFor={column}>{column}</label>
      <br />
      <input onChange={handleNumberChange} name="from" type="number" placeholder="from" id={column} />
      <input onChange={handleNumberChange} name="to" type="number" placeholder="to" id={column} />
    </div>
  )
}

export default SearchInteger
