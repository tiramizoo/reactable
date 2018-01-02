import { SET_ITEMS, SORT_ITEMS } from '../actions/items'
import { sortByText, sortBy } from '../helpers/sorting'

function sortByType(state, action) {
  switch (action.columnType) {
    case 'text':
      return sortByText(state, action.column, action.direction)
    case 'integer':
    case 'float':
    case 'date':
    case 'boolean':
      return sortBy(state, action.column, action.direction)
    default:
      return state
  }
}

function items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SORT_ITEMS:
      return sortByType(state, action)
    default:
      return state
  }
}

export default items
