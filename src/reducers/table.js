import { INIT_SETTINGS, UPDATE_TABLE_WIDTH, UPDATE_ROW_HEIGHT, UPDATE_ROWS_NUMBER } from '../actions/settings'

const initState = {
  width: 1000,
  rows: 30,
  rowHeight: 30,
}

function table(state = initState, action) {
  let newTableParams = {}
  switch (action.type) {
    case INIT_SETTINGS:
      if (action.tableWidth) {
        newTableParams = { ...newTableParams, width: action.tableWidth }
      }
      if (action.rows) {
        newTableParams = { ...newTableParams, rows: action.rows }
      }
      if (action.rowHeight) {
        newTableParams = { ...newTableParams, rowHeight: action.rowHeight }
      }
      return { ...state, ...newTableParams } || initState
    case UPDATE_TABLE_WIDTH:
      return { ...state, width: action.width }
    case UPDATE_ROW_HEIGHT:
      return { ...state, rowHeight: action.height }
    case UPDATE_ROWS_NUMBER:
      return { ...state, rows: action.rows }
    default:
      return state
  }
}

export default table
