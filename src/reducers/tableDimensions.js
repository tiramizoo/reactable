import { INIT_SETTINGS, UPDATE_TABLE_WIDTH } from '../actions/settings'

const initState = {
  width: 1000,
}

function tableDimensions(state = initState, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return { ...state, width: action.tableWidth } || initState
    case UPDATE_TABLE_WIDTH:
      return { ...state, width: action.width }
    default:
      return state
  }
}

export default tableDimensions
