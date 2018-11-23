import { UPDATE_VIEWPORT } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

function currentItems(state = [], action) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return action.items.slice(action.offset, action.offset + action.limit)
    case INIT_SETTINGS:
      return []
    default:
      return state
  }
}

export default currentItems
