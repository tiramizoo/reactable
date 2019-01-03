import forEach from 'lodash/forEach'
import assign from 'lodash/assign'

import { setSortDirectionToSchema } from '../helpers/utilities'

import { SET_SORT_DIRECTION, UPDATE_FILTERED_SCHEMA } from '../actions/schema'
import { INIT_SETTINGS } from '../actions/settings'

const initState = {}
function filteredSchema(state = initState, action) {
  let newFilteredSchema = {}
  switch (action.type) {
    case SET_SORT_DIRECTION:
      return setSortDirectionToSchema(state, action.key, action.direction)
    case INIT_SETTINGS:
      if (state === initState) {
        forEach(action.settings.schema, (value, key) => {
          if (!value.hide) {
            newFilteredSchema = assign({}, newFilteredSchema, { [key]: value })
          }
          return { [key]: value }
        })
        return newFilteredSchema
      }
      return state
    case UPDATE_FILTERED_SCHEMA:
      return action.schema
    default:
      return state
  }
}

export default filteredSchema
