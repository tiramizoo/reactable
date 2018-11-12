import { SET_OFFSET } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'


function offset(state = 0, action) {
  switch (action.type) {
    case SET_OFFSET:
      return action.offset
    case INIT_SETTINGS:
      return 0
    default:
      return state
  }
}

export default offset
