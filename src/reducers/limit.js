import { SET_LIMIT } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

const initLimit = 20

function limit(state = initLimit, action) {
  switch (action.type) {
    case SET_LIMIT:
      return action.limit
    case INIT_SETTINGS:
      return action.settings.limit || initLimit
    default:
      return state
  }
}

export default limit
