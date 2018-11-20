import { SET_SORT_DIRECTION , UPDATE_SCHEMA_OPTIONS} from '../actions/schema'
import { INIT_SETTINGS } from '../actions/settings'


function schema(state = {}, action) {
  let options = {}
  switch (action.type) {
    case SET_SORT_DIRECTION:
      Object.keys(state).forEach((key) =>
        delete state[key].direction
      )
      options = Object.assign({}, state[action.key], { direction: action.direction })
      return Object.assign({}, state, { [action.key]: options })
    case INIT_SETTINGS:
      return action.settings.schema
    case UPDATE_SCHEMA_OPTIONS:
      return Object.assign({}, state, { [action.key]: action.options })
    default:
      return state
  }
}

export default schema
