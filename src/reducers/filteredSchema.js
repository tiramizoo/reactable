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
        Object.keys(action.settings.schema).forEach((k) => {
          if (action.settings.schema[k].visible !== undefined) {
            if (action.settings.schema[k].visible === false) {
              return null
            }
            newFilteredSchema[k] = action.settings.schema[k]
          } else {
            newFilteredSchema[k] = action.settings.schema[k]
          }
        })
        return newFilteredSchema
      }
      // do nothing when state loaded from localStorage
      return state
    case UPDATE_FILTERED_SCHEMA:
      Object.keys(action.schema).forEach((k) => {
        if (action.schema[k].visible !== undefined) {
          if (action.schema[k].visible === false) {
            return null
          }
          newFilteredSchema[k] = action.schema[k]
        } else {
          newFilteredSchema[k] = action.schema[k]
        }
      })
      return newFilteredSchema
    default:
      return state
  }
}

export default filteredSchema
