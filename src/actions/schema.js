import omit from 'lodash/omit'
import forEach from 'lodash/forEach'

export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
export const UPDATE_FILTERED_SCHEMA = 'UPDATE_FILTERED_SCHEMA'

export function setSortDirection(key, direction) {
  return {
    type: SET_SORT_DIRECTION,
    key,
    direction,
  }
}

export function updateFilteredSchema(schema) {
  return {
    type: UPDATE_FILTERED_SCHEMA,
    schema,
  }
}

export const addToFilteredSchema = key => (dispatch, getState) => {
  const { schema, filteredSchema } = getState()
  const newSchema = Object.assign({}, filteredSchema, { [key]: schema[key] })
  let newSchemaOrdered = {}

  forEach(schema, (value, k) => {
    if (newSchema[k]) {
      newSchemaOrdered = Object.assign({}, newSchemaOrdered, { [k]: newSchema[k] })
    }
  })

  dispatch(updateFilteredSchema(newSchemaOrdered))
}

export const removeFromFilteredSchema = key => (dispatch, getState) => {
  const newSchema = Object.assign({}, {}, omit(getState().filteredSchema, key))

  dispatch(updateFilteredSchema(newSchema))
}
