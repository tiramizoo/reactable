import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import concat from 'lodash/concat'
import omit from 'lodash/omit'
import n from 'numeral'

import { updateViewport, setSearchQuery, setFilteredItems, setOffset, clearSearchQuery, setSearchQueryOr } from './items'

// Search by
// TEXT
function searchByText(items, column, searchQuery) {
  const options = searchQuery.options || 'all'
  switch (options) {
    case 'all':
      if (searchQuery.value) {
        return filter(items, (item) => {
          return item[column] && item[column].toLowerCase().includes(searchQuery.value.toLowerCase())
        })
      }
      return items
    case 'equal':
      return filter(items, item => item[column] && item[column] === searchQuery.value)
    case 'notEqual':
      return filter(items, item => item[column] && item[column] !== searchQuery.value)
    case 'match':
      return filter(items, item => item[column] && item[column].match(searchQuery.value))
    case 'notMatch':
      return filter(items, item => item[column] && !item[column].match(searchQuery.value))
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
  const options = searchQuery.value || 'all'
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

export const searchByOr = (items, schema, searchQuery) => {
  if (isEmpty(searchQuery)) {
    return items
  }
  let filteredItems = []
  Object.entries(searchQuery).map(([column, searchQueryValue]) => {
    const newFilteredItems = searchByType(items, schema[column].type, column, searchQueryValue)
    filteredItems = concat(filteredItems, newFilteredItems)
    filteredItems = uniqBy(filteredItems, '_key')
    return filteredItems
  })
  return filteredItems
}

export const searchByAnd = (items, schema, searchQuery) => {
  if (isEmpty(searchQuery)) {
    return items
  }
  let filteredItems = items
  Object.entries(searchQuery).map(([column, searchQueryValue]) => {
    filteredItems = searchByType(filteredItems, schema[column].type, column, searchQueryValue)
    return filteredItems
  })
  return filteredItems
}

export const searchBy = (items, searchAnd, searchOr, schema, strategySearch) => {
  let filteredItems = []

  if (isEmpty(searchAnd) && isEmpty(searchOr)) {
    filteredItems = items
    return filteredItems
  }
  // console.log('searchAnd: ', searchAnd)
  // console.log('searchOr: ', searchOr)
  if (strategySearch === 'or') {
    const filteredItemsAnd = searchByAnd(items, schema, searchAnd)
    const filteredItemsOr = searchByOr(items, schema, searchOr)
    filteredItems = concat(filteredItemsAnd, filteredItemsOr)
    filteredItems = uniqBy(filteredItems, '_key')

    // Object.entries(searchOr).map(([column, searchQuery]) => {
    //   const newFilteredItems = searchByType(items, schema[column].type, column, searchQuery)
    //   filteredItems = concat(filteredItems, newFilteredItems)
    //   filteredItems = uniqBy(filteredItems, '_key')
    //   return filteredItems
    // })
  } else {
    // filteredItems = items
    // Object.entries(searchAnd).map(([column, searchQuery]) => {
    //   filteredItems = searchByType(filteredItems, schema[column].type, column, searchQuery)
    //   return filteredItems
    // })

    const filteredItemsAnd = searchByAnd(items, schema, searchAnd)
    filteredItems = searchByOr(filteredItemsAnd, schema, searchOr)
    filteredItems = uniqBy(filteredItems, '_key')
  }

  return filteredItems
}

export const searching = ({ query, store }) => {
  const {
    items, schema, limit, searchQuery, settings, searchOr,
  } = store.getState()
  const { strategySearch } = settings

  let newSearchValue = {}
  let newSearchQuery = searchQuery

  Object.entries(query).map(([column, _searchQuery]) => {
    const { value, options } = _searchQuery
    if (value !== undefined || options !== undefined) {
      newSearchValue = Object.assign({}, newSearchQuery[column], { value, options })
      newSearchQuery = Object.assign({}, newSearchQuery, { [column]: newSearchValue })
    } else {
      newSearchQuery = Object.assign({}, {}, omit(newSearchQuery, column))
    }
    store.dispatch(setSearchQuery(column, newSearchValue))
  })

  const filteredItems = searchBy(items, newSearchQuery, searchOr, schema, strategySearch)
  store.dispatch(setFilteredItems(filteredItems))
  store.dispatch(setOffset(0))
  store.dispatch(updateViewport(filteredItems, limit, 0))
}

export const searchingOr = ({ query, store }) => {
  const {
    items, schema, limit, searchQueryOr, settings, searchQuery,
  } = store.getState()
  const { strategySearch } = settings

  let newSearchValue = {}
  let newSearchQuery = searchQueryOr

  Object.entries(query).map(([column, _searchQuery]) => {
    const { value, options } = _searchQuery
    if (value !== undefined || options !== undefined) {
      newSearchValue = Object.assign({}, newSearchQuery[column], { value, options })
      newSearchQuery = Object.assign({}, newSearchQuery, { [column]: newSearchValue })
    } else {
      newSearchQuery = Object.assign({}, {}, omit(newSearchQuery, column))
    }
    store.dispatch(setSearchQueryOr(column, newSearchValue))
  })

  const filteredItems = searchBy(items, searchQuery, newSearchQuery, schema, strategySearch)
  store.dispatch(setFilteredItems(filteredItems))
  store.dispatch(setOffset(0))
  store.dispatch(updateViewport(filteredItems, limit, 0))
}

export const reSearching = items => (dispatch, getState) => {
  const {
    filteredSchema, limit, searchQuery, searchQueryOr, settings,
  } = getState()
  const { strategySearch } = settings

  const filteredItems = searchBy(items, searchQuery, searchQueryOr, filteredSchema, strategySearch)
  dispatch(setFilteredItems(filteredItems))
  dispatch(setOffset(0))
  dispatch(updateViewport(filteredItems, limit, 0))
}

export const clearAllSearchQuery = () => (dispatch, getState) => {
  const { items, limit } = getState()

  dispatch(clearSearchQuery())
  dispatch(setFilteredItems(items))
  dispatch(setOffset(0))
  dispatch(updateViewport(items, limit, 0))
}
