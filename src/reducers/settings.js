import { INIT_SETTINGS, TOGGLE_SEARCH_CONTROL, TOGGLE_SCHEMA_CONTROL } from '../actions/settings'
// {htmlId: "table1", dataPath: "./data-100.json", offset: 0, limit: 10}

const initSettings = { controlShow: false, schemaControlShow: false }

function settings(state = initSettings, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return Object.assign({}, state, action.settings)
    case TOGGLE_SEARCH_CONTROL:
      return Object.assign({}, state, { controlShow: !state.controlShow })
    case TOGGLE_SCHEMA_CONTROL:
      return Object.assign({}, state, { schemaControlShow: !state.schemaControlShow })
    default:
      return state
  }
}

export default settings
