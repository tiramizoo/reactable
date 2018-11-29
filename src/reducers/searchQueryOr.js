import { SET_SEARCH_QUERY_OR, CLEAR_ALL } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

// {first_name: {value: 'Jon', options: ''} }
function searchQueryOr(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY_OR:
      return action.query
    case CLEAR_ALL:
    case INIT_SETTINGS:
      return {}
    default:
      return state
  }
}

export default searchQueryOr
