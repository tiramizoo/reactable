import { INIT_SETTINGS, TOGGLE_CONTROL_SHOW } from '../actions/settings'
// {htmlId: "table1", dataPath: "./data-100.json", offset: 0, limit: 10}

const initSettings = { controlShow: false }

function settings(state = initSettings, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return Object.assign({}, state, action.settings)
    case TOGGLE_CONTROL_SHOW:
      return Object.assign({}, state, { controlShow: !state.controlShow })
    default:
      return state
  }
}

export default settings
