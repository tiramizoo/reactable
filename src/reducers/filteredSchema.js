import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'

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
      // could be loaded from localStorage if not hide some columns
      if (isEmpty(state)) {
        forEach(action.settings.schema, (value, key) => {
          if (value.visible !== false) {
            newFilteredSchema = Object.assign({}, newFilteredSchema, { [key]: value })
          }
          return { [key]: value }
        })
        return newFilteredSchema
      }
      // do nothing when state loaded from localStorage
      return state
    case UPDATE_FILTERED_SCHEMA:
      return action.schema
    default:
      return state
  }
}

export default filteredSchema
