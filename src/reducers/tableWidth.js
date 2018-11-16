import { INIT_SETTINGS, UPDATE_TABLE_WIDTH } from '../actions/settings'

const initState = 1000

function tableWidth(state = initState, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return action.tableWidth || initState
    case UPDATE_TABLE_WIDTH:
      return action.width
    default:
      return state
  }
}

export default tableWidth
