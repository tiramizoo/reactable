import React from 'react'
import debounce from 'lodash/debounce'
import searching from '../../helpers/searching'

const SearchBoolean = (props) => {
  const {
    updateViewport, setFilteredItems, setSearchQuery,
    search, column, items, limit, offset, schema,
  } = props

  const updateFilteredItems = (newFilteredItems) => {
    setFilteredItems(newFilteredItems)
    updateViewport(newFilteredItems, limit, offset)
  }

  const searchByBoolean = debounce((newParams, searchQuery) => {
    setSearchQuery(column, newParams)
    const filteredItems = searching(items, searchQuery, schema)
    updateFilteredItems(filteredItems)
  })

  const handleParamsChange = (e) => {
    const newParams = Object.assign({}, search[column], { params: e.target.value })
    const searchQuery = Object.assign({}, search, { [column]: newParams })
    searchByBoolean(newParams, searchQuery)
  }

  return (
    <div>
      <label htmlFor={column}>{column}</label>
      <br />
      <select onChange={handleParamsChange}>
        <option value="all">All</option>
        <option value="true">True</option>
        <option value="false">False</option>
        <option value="empty">Empty</option>
        <option value="notEmpty">Not Empty</option>
      </select>
    </div>
  )
}

export default SearchBoolean
