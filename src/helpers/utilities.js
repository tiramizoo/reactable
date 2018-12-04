import orderBy from 'lodash/orderBy'
import uniqueId from 'lodash/uniqueId'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import compact from 'lodash/compact'

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

export function addMetaDataToItems(items) {
  return map(items, i => Object.assign({}, i, { _key: uniqueId() }))
}

export function addParsedDateTime(items, schema) {
  const dataTimeKeys = compact(Object.entries(schema).map(([key, params]) => {
    if (params.type === 'datetime') {
      return key
    }
  }))
  return map(items, (item) => {
    const newItem = map(dataTimeKeys, (key) => {
      return { [key]: new Date(Date.parse(item[key])) }
    })
    return Object.assign({}, item, ...newItem)
  })
}

export function setSortDiractionToSchema(schema, key, direction) {
  forEach(schema, (_, k) => { delete schema[k].direction })
  const options = Object.assign({}, schema[key], { direction })
  return Object.assign({}, schema, { [key]: options })
}

export const addZeroToNumber = (value) => {
  if (value < 10) {
    return `0${value}`
  }
  return value.toString()
}

export const defaultFormatter = (type, key) => {
  switch (type) {
    case 'boolean':
      return (value) => {
        if (value === true) {
          return '●'
        } else if (value === false) {
          return '○'
        }
      }
    case 'datetime':
      return (value) => {
        const month = addZeroToNumber(value.getMonth() + 1)
        const day = addZeroToNumber(value.getDate())
        const hour = addZeroToNumber(value.getHours())
        const minutes = addZeroToNumber(value.getMinutes())
        return `${value.getFullYear()}-${month}-${day} ${hour}:${minutes}`
      }
    default:
      return value => value
  }
}
