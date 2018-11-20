import forEach from 'lodash/forEach'
import assign from 'lodash/assign'

import { SET_SORT_DIRECTION, UPDATE_FILTERED_SCHEMA } from '../actions/schema'
import { INIT_SETTINGS } from '../actions/settings'

function filteredSchema(state = {}, action) {
  let options = {}
  let newFilteredSchema = {}
  switch (action.type) {
    case SET_SORT_DIRECTION:
      forEach(state, (values, key) => { delete state[key].direction })
      options = Object.assign({}, state[action.key], { direction: action.direction })
      return Object.assign({}, state, { [action.key]: options })
    case INIT_SETTINGS:
      forEach(action.settings.schema, (value, key) => {
        if (!value.hide) {
          newFilteredSchema = assign(newFilteredSchema, { [key]: value })
        }
        return { [key]: value }
      })
      return newFilteredSchema
    case UPDATE_FILTERED_SCHEMA:
      return action.schema
    default:
      return state
  }
}

export default filteredSchema
