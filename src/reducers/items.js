import { SET_ITEMS, SET_SORT_ITEMS, CLEAR_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
    case SET_SORT_ITEMS:
      return action.items
    case INIT_SETTINGS:
    case CLEAR_ITEMS:
      return []
    default:
      return state
  }
}

export default items
