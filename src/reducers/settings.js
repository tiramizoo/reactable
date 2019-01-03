import {
  INIT_SETTINGS, TOGGLE_SEARCH_CONTROL, TOGGLE_SCHEMA_CONTROL, SET_PROGRESS_MAX,
} from '../actions/settings'

const initSettings = {
  controlShow: false,
  strategySearch: 'and',
  controls: {},
  progressMax: 0,
}

function settings(state = initSettings, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return Object.assign({}, state, action.settings)
    case SET_PROGRESS_MAX:
      return Object.assign({}, state, { progressMax: action.progressMax })
    default:
      return state
  }
}

export default settings
