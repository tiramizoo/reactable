import { INIT_SETTINGS, TOGGLE_SEARCH_CONTROL, TOGGLE_SCHEMA_CONTROL } from '../actions/settings'
// {htmlId: "table1", dataPath: "./data-100.json", offset: 0, limit: 10}, controlShow: false, tableWidth: 1000,
// schema: {
//   first_name: {
//   type: 'text',
//   formatter: function (row) {
//     return "<a href='/users/" + row['id'] + " 'target='_top'>" + row['first_name'] + "</a>"
//   },
//   },
//   last_name: {
//     type: 'text',
//     hide: false,
//   },
//   active: {
//     type: 'boolean',
//     filter: false,
//   },
// }

const initSettings = { controlShow: false, schemaControlShow: false, strategySearch: 'and' }

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
