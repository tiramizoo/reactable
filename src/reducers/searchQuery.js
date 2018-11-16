import { SET_SEARCH_QUERY, CLEAR_ALL } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

// {first_name: {value: 'Jon', options: ''} }
function searchQuery(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return Object.assign({}, state, { [action.column]: action.query })
    case CLEAR_ALL:
    case INIT_SETTINGS:
      return {}
    default:
      return state
  }
}

export default searchQuery
