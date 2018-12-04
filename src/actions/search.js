import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import concat from 'lodash/concat'
import omit from 'lodash/omit'

import { updateViewport, setSearchQueryAnd, setFilteredItems, setOffset, clearSearchQuery, setSearchQueryOr } from './items'

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
      return filter(items, item => isEmpty(item[column]))
    case 'notEmpty':
      return filter(items, item => !isEmpty(item[column]))
    default:
      return []
  }
}

function searchByBoolean(items, column, searchQuery) {
  const options = searchQuery.value || 'all'
  switch (options) {
    case 'all':
      return items
    case 'true':
      return filter(items, item => item[column] === true)
    case 'false':
      return filter(items, item => item[column] === false)
    case 'empty':
      return filter(items, item => item[column] !== true && item[column] !== false)
    case 'notEmpty':
      return filter(items, item => item[column] === true || item[column] === false)
    default:
      return []
  }
}

function searchByRange(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = item[column]
        return itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, item => item[column] >= searchQuery.value.from)
    }
    if (searchQuery.value.to) {
      return filter(items, item => item[column] <= searchQuery.value.to)
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
    case 'number':
    case 'date':
    case 'datetime':
      return searchByRange(items, column, searchQuery)
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
    return filteredItems
  })

  return uniqBy(filteredItems, '_key')
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
  if (isEmpty(searchAnd) && isEmpty(searchOr)) {
    return items
  }

  if (strategySearch === 'or') {
    const filteredItemsAnd = searchByAnd(items, schema, searchAnd)
    const filteredItemsOr = searchByOr(items, schema, searchOr)

    return uniqBy(concat(filteredItemsAnd, filteredItemsOr), '_key')
  }
  const filteredItemsAnd = searchByAnd(items, schema, searchAnd)

  return searchByOr(filteredItemsAnd, schema, searchOr)
}

export const mergeSearchQuery = (newQuery, currentQuery) => {
  let newSearchQuery = currentQuery

  Object.entries(newQuery).forEach(([column, _searchQuery]) => {
    const { value, options } = _searchQuery
    if (value !== undefined || options !== undefined) {
      const newSearchValue = Object.assign({}, newSearchQuery[column], { value, options })
      newSearchQuery = Object.assign({}, newSearchQuery, { [column]: newSearchValue })
    } else {
      newSearchQuery = Object.assign({}, {}, omit(newSearchQuery, column))
    }
  })

  return newSearchQuery
}

export const searchingBy = ({ query, store, type }) => {
  const {
    items, schema, limit, searchQueryAnd, searchQueryOr, settings,
  } = store.getState()
  const { strategySearch } = settings
  let filteredItems = []
  let newSearchQuery = []

  if (type === 'or') {
    // OR
    newSearchQuery = mergeSearchQuery(query, searchQueryOr)
    filteredItems = searchBy(items, searchQueryAnd, newSearchQuery, schema, strategySearch)
    store.dispatch(setSearchQueryOr(newSearchQuery))
  } else {
    // AND
    newSearchQuery = mergeSearchQuery(query, searchQueryAnd)
    filteredItems = searchBy(items, newSearchQuery, searchQueryOr, schema, strategySearch)
    store.dispatch(setSearchQueryAnd(newSearchQuery))
  }

  store.dispatch(setFilteredItems(filteredItems))
  store.dispatch(setOffset(0))
  store.dispatch(updateViewport(filteredItems, limit, 0))
}

export const searchingAnd = ({ query, store }) => {
  searchingBy({ query, store, type: 'and' })
}

export const searchingOr = ({ query, store }) => {
  searchingBy({ query, store, type: 'or' })
}

export const reSearching = items => (dispatch, getState) => {
  const {
    filteredSchema, limit, searchQueryAnd, searchQueryOr, settings,
  } = getState()
  const { strategySearch } = settings
  const filteredItems = searchBy(items, searchQueryAnd, searchQueryOr, filteredSchema, strategySearch)

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
