import {
  INIT_SETTINGS, SET_PROGRESS_MAX, NO_DATA,
} from '../actions/settings'
import { CLEAR_ITEMS } from '../actions/items'

const initSettings = {
  controlShow: false,
  strategySearch: 'and',
  controls: {},
  progressMax: 0,
  dateSeparator: '-',
  dateFormat: 'iso',
  defaultSearchPreset: '',
  noData: false,
}

function settings(state = initSettings, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return Object.assign({}, state, action.settings)
    case SET_PROGRESS_MAX:
      return Object.assign({}, state, { progressMax: action.progressMax })
    case CLEAR_ITEMS:
      return Object.assign({}, state, { progressMax: 0 })
    case NO_DATA:
      return Object.assign({}, state, { noData: true })
    default:
      return state
  }
}

export default settings
