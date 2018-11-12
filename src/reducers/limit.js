import { SET_LIMIT } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'


function limit(state = 20, action) {
  switch (action.type) {
    case SET_LIMIT:
      return action.limit
    case INIT_SETTINGS:
      return 20
    default:
      return state
  }
}

export default limit
