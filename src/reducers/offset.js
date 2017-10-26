import { SET_OFFSET } from '../actions/items'

function offset(state = 0, action) {
  switch (action.type) {
    case SET_OFFSET:
      return action.offset
    default:
      return state
  }
}

export default offset
