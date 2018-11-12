import { INIT_SETTINGS } from '../actions/settings'
// {htmlId: "table1", dataPath: "./data-100.json", offset: 0, limit: 10}

function settings(state = {}, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return action.settings
    default:
      return state
  }
}

export default settings
