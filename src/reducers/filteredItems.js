import { SET_ITEMS, SET_FILTERED_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function filteredItems(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SET_FILTERED_ITEMS:
      return action.items
    case INIT_SETTINGS:
      return []
    default:
      return state
  }
}

export default filteredItems
