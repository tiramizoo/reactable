export const INIT_SETTINGS = 'INIT_SETTINGS'
export const UPDATE_TABLE_WIDTH = 'UPDATE_TABLE_WIDTH'
export const UPDATE_ROW_HEIGHT = 'UPDATE_ROW_HEIGHT'
export const UPDATE_ROWS_NUMBER = 'UPDATE_ROWS_NUMBER'
export const TOGGLE_SEARCH_CONTROL = 'TOGGLE_SEARCH_CONTROL'
export const TOGGLE_SCHEMA_CONTROL = 'TOGGLE_SCHEMA_CONTROL'
export const SET_PROGRESS_MAX = 'SET_PROGRESS_MAX'
export const NO_DATA = 'NO_DATA'

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

export function updateRowHeight(height) {
  return {
    type: UPDATE_ROW_HEIGHT,
    height,
  }
}

export function updateRowsNumber(rows) {
  return {
    type: UPDATE_ROWS_NUMBER,
    rows,
  }
}

export function setProgressMax(progressMax) {
  return {
    type: SET_PROGRESS_MAX,
    progressMax,
  }
}

export function setNoData() {
  return {
    type: NO_DATA,
  }
}
