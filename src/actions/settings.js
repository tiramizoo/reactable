export const INIT_SETTINGS = 'INIT_SETTINGS'
export const UPDATE_TABLE_WIDTH = 'UPDATE_TABLE_WIDTH'
export const TOGGLE_CONTROL_SHOW = 'TOGGLE_CONTROL_SHOW'

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

export function toggleControlShow() {
  return {
    type: TOGGLE_CONTROL_SHOW,
  }
}
