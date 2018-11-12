import { SET_SCHEMA, SET_SORT_DIRECTION } from '../actions/schema'
import { INIT_SETTINGS } from '../actions/settings'


function schema(state = {}, action) {
  let options = {}
  switch (action.type) {
    case SET_SCHEMA:
      return action.schema
    case SET_SORT_DIRECTION:
      Object.keys(state).forEach((key) =>
        delete state[key].direction
      )
      options = Object.assign({}, state[action.key], { direction: action.direction })
      return Object.assign({}, state, { [action.key]: options })
    case INIT_SETTINGS:
      return {}
    default:
      return state
  }
}

export default schema
