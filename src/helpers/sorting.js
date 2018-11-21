import orderBy from 'lodash/orderBy'

export function sortByType(state, action) {
  return orderBy(state, [action.column], [action.direction]);
}
