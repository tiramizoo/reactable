import React from 'react'
import debounce from 'lodash/debounce'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'

const SearchText = (props) => {
  const {
    updateViewport, setFilteredItems, setSearch,
    search, column, items, limit, offset,
  } = props

  const searching = debounce((value) => {
    const searchValue = value.toLowerCase()
    const searchQuery = Object.assign({}, search, { [column]: searchValue })
    const filteredItems = filter(items, (item) => {
      const arrayOfBooleans = Object.entries(searchQuery).map(([k, v]) =>
        item[k].toLowerCase().includes(v))
      return reduce(arrayOfBooleans, (result, boolean) => result && boolean)
    })

    setSearch(column, searchValue)
    setFilteredItems(filteredItems)
    updateViewport(filteredItems, limit, offset)
  }, 500)

  const handleChange = (e) => {
    searching(e.target.value)
  }

  return (
    <div>
      <label>{column}</label>
      <input onChange={handleChange} placeholder={column} id={column} />
    </div>
  )
}

export default SearchText
