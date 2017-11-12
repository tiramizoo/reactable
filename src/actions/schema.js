export const SET_SCHEMA = 'SET_SCHEMA'

export function setSchema(schema) {
  return {
    type: SET_SCHEMA,
    schema,
  }
}
