export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
export const UPDATE_SCHEMA_OPTIONS = 'UPDATE_SCHEMA_OPTIONS'

export function setSortDirection(key, direction) {
  return {
    type: SET_SORT_DIRECTION,
    key,
    direction,
  }
}

export function updateSchemaOptions(key, options) {
  return {
    type: UPDATE_SCHEMA_OPTIONS,
    key,
    options,
  }
}
