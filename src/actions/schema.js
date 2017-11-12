export const SET_SCHEMA = 'SET_SCHEMA'
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'

export function setSchema(schema) {
  return {
    type: SET_SCHEMA,
    schema,
  }
}

export function setSortDirection(key, direction) {
  return {
    type: SET_SORT_DIRECTION,
    key,
    direction,
  }
}
