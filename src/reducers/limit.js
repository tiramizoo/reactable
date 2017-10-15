import { SET_LIMIT } from '../actions/items_actions'

function limit(state = 20, action) {
  switch (action.type) {
    case SET_LIMIT:
      return action.limit
    default:
      return state
  }
}

export default limit
