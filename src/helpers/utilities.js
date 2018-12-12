import orderBy from 'lodash/orderBy'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import omit from 'lodash/omit'

export function sortByType(items, action) {
  return orderBy(items, [action.column], [action.direction])
}

export function sortBy(items, filteredSchema) {
  let sortedItems = items
  forEach(filteredSchema, (value, key) => {
    if (value.direction) {
      sortedItems = sortByType(items, { column: key, direction: value.direction })
    }
  })
  return sortedItems
}

export function setSortDirectionToSchema(schema, key, direction) {
  forEach(schema, (_, k) => { delete schema[k].direction })
  const options = Object.assign({}, schema[key], { direction })
  return Object.assign({}, schema, { [key]: options })
}

export const defaultFormatter = (type, key) => {
  switch (type) {
    case 'number':
      return (value) => {
        if (value === null) {
          return null
        } else {
          return value.toString()
        }
      }
    case 'boolean':
      return (value) => {
        if (value === true) {
          return '●'
        }
        if (value === false) {
          return '○'
        }
        return null
      }
    case 'datetime':
      return (value) => {
        if (value) {
          return value.toFormat('yyyy-MM-dd hh:mm:ss')
        }
        return null
      }

    case 'duration':
      return (value) => {
        if (value) {
          return value.toFormat('hh:mm:ss')
        }
        return null
      }
    default:
      return value => value
  }
}

// Search

export function searchByText(items, column, searchQuery) {
  const options = searchQuery.options || 'all'
  switch (options) {
    case 'all':
      if (searchQuery.value) {
        return filter(items, item => (
          item[column] && item[column].toLowerCase().includes(searchQuery.value.toLowerCase())
        ))
      }
      return items
    case 'equal':
      return filter(items, item => item[column] && item[column] === searchQuery.value)
    case 'notEqual':
      return filter(items, item => item[column] !== searchQuery.value)
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

export function searchByBoolean(items, column, searchQuery) {
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

export function searchByRange(items, column, searchQuery) {
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

export function searchByType(items, type, column, searchQuery) {
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
    filteredItems = filteredItems.concat(newFilteredItems)
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

export const searchBy = (items, searchQueryAnd, searchQueryOr, schema, strategySearch) => {
  if (isEmpty(searchQueryAnd) && isEmpty(searchQueryOr)) {
    return items
  }

  if (strategySearch === 'or') {
    const filteredItemsAnd = searchByAnd(items, schema, searchQueryAnd)
    const filteredItemsOr = searchByOr(items, schema, searchQueryOr)

    return uniqBy(filteredItemsAnd.concat(filteredItemsOr), '_key')
  }
  const filteredItemsAnd = searchByAnd(items, schema, searchQueryAnd)

  return searchByOr(filteredItemsAnd, schema, searchQueryOr)
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
