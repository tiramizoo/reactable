import { SET_ITEMS, SORT_ITEMS, ADD_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

import { sortByType } from '../helpers/sorting'

function items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SORT_ITEMS:
      return sortByType(state, action)
    case ADD_ITEMS:
      return [...state, ...action.items]
    case INIT_SETTINGS:
      return []
    default:
      return state
  }
}

export default items
