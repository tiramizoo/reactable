import { INIT_SETTINGS } from '../actions/settings'

function schema(state = {}, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return action.settings.schema
    default:
      return state
  }
}

export default schema
