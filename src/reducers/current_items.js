import { UPDATE_VIEWPORT } from '../actions/items_actions'

function current_items(state = [], action) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return action.items.slice(action.offset, action.offset + action.limit)
    default:
      return state
  }
}

export default current_items
