import orderBy from 'lodash/orderBy'
import uniqueId from 'lodash/uniqueId'
import assign from 'lodash/assign'
import map from 'lodash/map'

export function sortByType(state, action) {
  return orderBy(state, [action.column], [action.direction])
}

export function addMetaDataToItems(items) {
  return map(items, i => assign({}, i, { _key: uniqueId() }))
}
