import orderBy from 'lodash/orderBy'
import uniqueId from 'lodash/uniqueId'
import assign from 'lodash/assign'
import map from 'lodash/map'
import forEach from 'lodash/forEach'

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
  return map(items, i => assign({}, i, { _key: uniqueId() }))
}

export function setSortDiractionToSchema(schema, key, direction) {
  forEach(schema, (_, k) => { delete schema[k].direction })
  const options = assign({}, schema[key], { direction })
  return assign({}, schema, { [key]: options })
}
