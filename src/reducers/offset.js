import { SET_OFFSET } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

const initOffset = 0

function offset(state = initOffset, action) {
  switch (action.type) {
    case SET_OFFSET:
      return action.offset
    case INIT_SETTINGS:
      return action.settings.offset || initOffset
    default:
      return state
  }
}

export default offset
