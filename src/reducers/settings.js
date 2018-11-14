import { INIT_SETTINGS } from '../actions/settings'
// {htmlId: "table1", dataPath: "./data-100.json", offset: 0, limit: 10}

const initSettings = { control: true }

function settings(state = initSettings, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return Object.assign({}, state, action.settings)
    default:
      return state
  }
}

export default settings
