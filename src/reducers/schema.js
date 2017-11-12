import { SET_SCHEMA, SET_SORT_DIRECTION } from '../actions/schema'

function schema(state = {}, action) {
  let params = {}
  switch (action.type) {
    case SET_SCHEMA:
      return action.schema
    case SET_SORT_DIRECTION:
      params = Object.assign({}, state[action.key], { direction: action.direction })
      return Object.assign({}, state, { [action.key]: params })
    default:
      return state
  }
}

export default schema
