import { SET_SEARCH_QUERY } from '../actions/items'

function search(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return Object.assign({}, state, { [action.column]: action.query })
    default:
      return state
  }
}

export default search
