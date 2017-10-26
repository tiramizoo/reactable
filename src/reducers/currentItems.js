import { UPDATE_VIEWPORT } from '../actions/items'

function currentItems(state = [], action) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return action.items.slice(action.offset, action.offset + action.limit)
    default:
      return state
  }
}

export default currentItems
