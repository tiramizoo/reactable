import { SET_ITEMS, SORT_ITEMS } from '../actions/items'
import { sortByType } from '../helpers/sorting'

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
