import { SET_ITEMS } from '../actions/items_actions'

function items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    default:
      return state
  }
}

export default items
