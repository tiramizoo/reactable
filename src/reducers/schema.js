import { SET_SCHEMA } from '../actions/schema'

function schema(state = {}, action) {
  switch (action.type) {
    case SET_SCHEMA:
      return action.schema
    default:
      return state
  }
}

export default schema
