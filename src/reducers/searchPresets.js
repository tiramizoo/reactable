import { INIT_SETTINGS } from '../actions/settings'

function searchPresets(state = {}, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return action.settings.searchPresets || {}
    default:
      return state
  }
}

export default searchPresets
