import { SET_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case INIT_SETTINGS:
      return []
    default:
      return state
  }
}

export default items
