export const INIT_SETTINGS = 'INIT_SETTINGS'
export const UPDATE_TABLE_WIDTH = 'UPDATE_TABLE_WIDTH'

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
