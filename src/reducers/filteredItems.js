import { SET_ITEMS, SET_FILTERED_ITEMS, SORT_ITEMS } from '../actions/items'
import { sortByType } from '../helpers/sorting'


function filteredItems(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SET_FILTERED_ITEMS:
      return action.items
    case SORT_ITEMS:
      return sortByType(state, action)
    default:
      return state
  }
}

export default filteredItems
