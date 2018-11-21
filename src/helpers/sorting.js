import _ from 'lodash'

export function sortByType(state, action) {
  return _.orderBy(state, [action.column], [action.direction]);
}
