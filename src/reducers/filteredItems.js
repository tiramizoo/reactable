import { SET_ITEMS, SET_FILTERED_ITEMS, CLEAR_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function filteredItems(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SET_FILTERED_ITEMS:
      return action.items
    case INIT_SETTINGS:
    case CLEAR_ITEMS:
      return []
    default:
      return state
  }
}

export default filteredItems
