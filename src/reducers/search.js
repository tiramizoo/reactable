import { SET_SEARCH } from '../actions/items'

function search(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH:
      return Object.assign({}, state, { [action.column]: action.value })
    default:
      return state
  }
}

export default search
