import orderBy from 'lodash/orderBy'
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import omit from 'lodash/omit'
import pickBy from 'lodash/pickBy'
import difference from 'lodash/difference'
import { DateTime, Duration } from 'luxon'

export function sortBy(items, filteredSchema) {
  let sortedItems = items
  forEach(filteredSchema, (value, key) => {
    if (value.direction) {
      sortedItems = orderBy(items, [key], [value.direction])
    }
  })
  return sortedItems
}

export function setSortDirectionToSchema(schema, key, direction) {
  forEach(schema, (_, k) => {
    delete schema[k].direction
  })
  const options = Object.assign({}, schema[key], { direction })
  return Object.assign({}, schema, { [key]: options })
}

export const dateFormatter = (value) => {
  return new Date(Date.parse(value)).toLocaleDateString()
}

export const timeFormatter = (value, disableSeconds) => {
  return value.toFormat(disableSeconds ? 'hh:mm' : 'hh:mm:ss')
}

export const datetimeFormatter = (value, displayTimeZone, disableSeconds) => {
  const format = disableSeconds ? DateTime.DATETIME_SHORT : DateTime.DATETIME_SHORT_WITH_SECONDS

  // force 24h format
  format.hour12 = false
  format.hour = '2-digit'

  return value.setZone(displayTimeZone).toLocaleString(format)
}

export const defaultFormatter = (type, displayTimeZone, disableSeconds) => {
  switch (type) {
    case 'time':
    case 'duration':
      return (value) => {
        if (value) {
          return timeFormatter(value, disableSeconds)
        }
        return null
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
    case 'date':
      return (value) => {
        if (value) {
          return dateFormatter(value)
        }

        return null
      }
    case 'datetime':
      return (value) => {
        if (value) {
          return datetimeFormatter(value, displayTimeZone, disableSeconds)
        }

        return null
      }
    default:
      return (value) => {
        if (value) {
          return value.toString()
        }

        return null
      }
  }
}

// Search

export function searchByText(items, column, searchQuery) {
  if (!isEmpty(searchQuery.dictionary)) {
    return filter(items, (item) => searchQuery.dictionary.includes(item[column]))
  }
  const options = searchQuery.options || 'all'
  switch (options) {
    case 'all':
      if (searchQuery.value) {
        return filter(
          items,
          (item) => item[column] && item[column].toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
      }
      return items
    case 'equal':
      return filter(items, (item) => item[column] && item[column] === searchQuery.value)
    case 'notEqual':
      return filter(items, (item) => item[column] !== searchQuery.value)
    case 'match':
      return filter(items, (item) => item[column] && item[column].match(searchQuery.value))
    case 'notMatch':
      return filter(items, (item) => item[column] && !item[column].match(searchQuery.value))
    case 'empty':
      return filter(items, (item) => isEmpty(item[column]))
    case 'notEmpty':
      return filter(items, (item) => !isEmpty(item[column]))
    default:
      return []
  }
}

export function searchByBoolean(items, column, searchQuery) {
  const options = searchQuery.value

  switch (options.toString()) {
    case 'all':
      return items
    case 'true':
      return filter(items, (item) => item[column] === true)
    case 'false':
      return filter(items, (item) => item[column] === false)
    case 'empty':
      return filter(items, (item) => item[column] !== true && item[column] !== false)
    case 'notEmpty':
      return filter(items, (item) => item[column] === true || item[column] === false)
    default:
      return []
  }
}

export function searchByRange(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = item[column]
        return itemValue && itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, (item) => item[column] && item[column] >= searchQuery.value.from)
    }
    if (searchQuery.value.to) {
      return filter(items, (item) => item[column] && item[column] <= searchQuery.value.to)
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
    case 'duration':
    case 'time':
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
    const { value, options, dictionary } = _searchQuery
    if (value !== undefined || options !== undefined || dictionary !== undefined) {
      const newSearchValue = Object.assign({}, newSearchQuery[column], {
        value,
        options,
        dictionary,
      })
      newSearchQuery = Object.assign({}, newSearchQuery, {
        [column]: newSearchValue,
      })
    } else {
      newSearchQuery = Object.assign({}, {}, omit(newSearchQuery, column))
    }
  })

  return newSearchQuery
}

export const filterSchemaByType = (schema, type) => {
  return pickBy(schema, (value, key) => {
    return value.type === type
  })
}

export const queryDataType = (query, schema) => {
  const dateTimeAttributes = Object.keys(filterSchemaByType(schema, 'datetime'))
  const durationAttributes = Object.keys(filterSchemaByType(schema, 'duration'))
  const timeAttributes = Object.keys(filterSchemaByType(schema, 'time'))
  const newQuery = {}

  Object.entries(query).map(([key, params]) => {
    newQuery[key] = params
    const { value } = params

    if (dateTimeAttributes.includes(key)) {
      if (value.from) {
        newQuery[key]['value']['from'] = DateTime.fromISO(value.from)
      }

      if (value.to) {
        newQuery[key]['value']['to'] = DateTime.fromISO(value.to)
      }
    }

    if (durationAttributes.includes(key)) {
      if (value.from) {
        newQuery[key]['value']['from'] = Duration.fromISO(value.from)
      }

      if (value.to) {
        newQuery[key]['value']['to'] = Duration.fromISO(value.to)
      }
    }

    if (timeAttributes.includes(key)) {
      if (value.from) {
        const [h, m, s] = value.from.split(':')
        newQuery[key]['value']['from'] = Duration.fromObject({
          hours: Number(h),
          minutes: Number(m),
          seconds: Number(s),
        })
      }

      if (value.to) {
        const [h, m, s] = value.to.split(':')
        newQuery[key]['value']['to'] = Duration.fromObject({
          hours: Number(h),
          minutes: Number(m),
          seconds: Number(s),
        })
      }
    }
  })

  return newQuery
}

export const getPrefix = (container, type, name) => {
  return `reactable-${container}-${type}-${name}`
}

export const isSelectedAllChecked = (selectedItems, filteredItems) => {
  const filteredIds = filteredItems.map((fi) => fi._key)
  const selectedIds = selectedItems.map((fi) => fi._key)
  if (filteredIds.length > selectedIds.length) return false
  if (difference(filteredIds, selectedIds).length > 0) return false
  return true
}
