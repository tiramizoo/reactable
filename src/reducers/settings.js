import {
  INIT_SETTINGS, SET_PROGRESS_MAX,
} from '../actions/settings'

const initSettings = {
  controlShow: false,
  strategySearch: 'and',
  controls: {},
  progressMax: 0,
  dateSeparator: '-',
  dateFormat: 'iso',
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
