import { UPDATE_VIEWPORT, CLEAR_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function currentItems(state = [], action) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return action.items.slice(action.offset, action.offset + action.limit)
    case INIT_SETTINGS:
    case CLEAR_ITEMS:
      return []
    default:
      return state
  }
}

export default currentItems
