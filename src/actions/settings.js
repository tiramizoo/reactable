export const INIT_SETTINGS = 'INIT_SETTINGS'
export const UPDATE_TABLE_WIDTH = 'UPDATE_TABLE_WIDTH'
export const TOGGLE_SEARCH_CONTROL = 'TOGGLE_SEARCH_CONTROL'
export const TOGGLE_SCHEMA_CONTROL = 'TOGGLE_SCHEMA_CONTROL'

export function initSettings(settings) {
  return {
    type: INIT_SETTINGS,
    settings,
  }
}

export function updateTableWidth(width) {
  return {
    type: UPDATE_TABLE_WIDTH,
    width,
  }
}

export function toggleSearchControl() {
  return {
    type: TOGGLE_SEARCH_CONTROL,
  }
}

export function toggleSchemaControl() {
  return {
    type: TOGGLE_SCHEMA_CONTROL,
  }
}
