import React from 'react'
import debounce from 'lodash/debounce'
import searching from '../../helpers/searching'

const SearchText = (props) => {
  const {
    updateViewport, setFilteredItems, setSearchQuery,
    search, column, items, limit, offset, schema,
  } = props

  const updateFilteredItems = (newFilteredItems) => {
    setFilteredItems(newFilteredItems)
    updateViewport(newFilteredItems, limit, offset)
  }

  const searchByText = debounce((newParams, searchQuery) => {
    setSearchQuery(column, newParams)
    const filteredItems = searching(items, searchQuery, schema)
    updateFilteredItems(filteredItems)
  })

  const handleTextChange = (e) => {
    const newParams = Object.assign({}, search[column], { value: e.target.value })
    const searchQuery = Object.assign({}, search, { [column]: newParams })
    searchByText(newParams, searchQuery)
  }

  const handleParamsChange = (e) => {
    const newParams = Object.assign({}, search[column], { params: e.target.value })
    const searchQuery = Object.assign({}, search, { [column]: newParams })
    searchByText(newParams, searchQuery)
  }

  return (
    <div>
      <label htmlFor={column}>{column}</label>
      <br />
      <input onChange={handleTextChange} type="search" placeholder={column} id={column} />
      <select onChange={handleParamsChange}>
        <option value="all">All</option>
        <option value="exact">Exact</option>
        <option value="empty">Empty</option>
        <option value="notEmpty">Not Empty</option>
      </select>
    </div>
  )
}

export default SearchText
