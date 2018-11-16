import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import n from 'numeral'

import {
  updateViewport, setSearchQuery, setFilteredItems, setOffset, clearSearchQuery
} from './items'

// Search by
// TEXT
function searchByText(items, column, searchQuery) {
  const options = searchQuery.options || 'all'
  switch (options) {
    case 'all':
      if (searchQuery.value) {
        return filter(items, (item) => {
          return item[column].toLowerCase().includes(searchQuery.value.toLowerCase())
        })
      }
      return items
    case 'exact':
      return filter(items, (item) => {
        return item[column] === searchQuery.value
      })
    case 'empty':
      return filter(items, (item) => {
        return isEmpty(item[column])
      })
    case 'notEmpty':
      return filter(items, (item) => {
        return !isEmpty(item[column])
      })
    default:
      return []
  }
}

// BOOLEAN
function searchByBoolean(items, column, searchQuery) {
  const options = searchQuery.options || 'all'
  switch (options) {
    case 'all':
      return items
    case 'true':
      return filter(items, (item) => {
        return item[column] === true
      })
    case 'false':
      return filter(items, (item) => {
        return item[column] === false
      })
    case 'empty':
      return filter(items, (item) => {
        return item[column] !== true && item[column] !== false
      })
    case 'notEmpty':
      return filter(items, (item) => {
        return item[column] === true || item[column] === false
      })
    default:
      return []
  }
}

// INTEGER
function searchByInteger(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = n(item[column]).value()
        return itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, (item) => {
        return n(item[column]).value() >= searchQuery.value.from
      })
    }
    if (searchQuery.value.to) {
      return filter(items, (item) => {
        return n(item[column]).value() <= searchQuery.value.to
      })
    }
  }

  return items
}


// DATE
function searchByDate(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = Date.parse(item[column])
        return itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, (item) => {
        return Date.parse(item[column]) >= searchQuery.value.from
      })
    }
    if (searchQuery.value.to) {
      return filter(items, (item) => {
        return Date.parse(item[column]) <= searchQuery.value.to
      })
    }
  }

  return items
}

function searchByType(items, type, column, searchQuery) {
  switch (type) {
    case 'text':
      return searchByText(items, column, searchQuery)
    case 'boolean':
      return searchByBoolean(items, column, searchQuery)
    case 'integer':
      return searchByInteger(items, column, searchQuery)
    case 'date':
    case 'datetime':
      return searchByDate(items, column, searchQuery)
    default:
      return []
  }
}

export default function searchBy(items, search, schema) {
  let filteredItems = items
  Object.entries(search).map(([column, searchQuery]) => {
    filteredItems = searchByType(filteredItems, schema[column].type, column, searchQuery)
    return filteredItems
  })
  return filteredItems
}

export const searching = ({ query, store }) => {
  const { column, value, options } = query
  const {
    items, schema, limit, searchQuery,
  } = store.getState()

  const newSearchValue = Object.assign({}, searchQuery[column], { value, options })
  store.dispatch(setSearchQuery(column, newSearchValue))
  const newSearchQuery = Object.assign({}, searchQuery, { [column]: newSearchValue })

  const filteredItems = searchBy(items, newSearchQuery, schema)
  store.dispatch(setFilteredItems(filteredItems))
  store.dispatch(setOffset(0))
  store.dispatch(updateViewport(filteredItems, limit, 0))
}

export const clearAllSearchQuery = () => (dispatch, getState) => {
  const { items, limit } = getState()

  dispatch(clearSearchQuery())
  dispatch(setFilteredItems(items))
  dispatch(setOffset(0))
  dispatch(updateViewport(items, limit, 0))
}
