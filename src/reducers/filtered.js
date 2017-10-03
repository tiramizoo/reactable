import { SET_ITEMS } from '../actions/items_actions'

function filtered(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    default:
      return state
  }
}

export default filtered
