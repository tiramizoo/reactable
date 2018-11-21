import { SET_ITEMS, SET_FILTERED_ITEMS, SORT_ITEMS } from '../actions/items'
import { INIT_SETTINGS } from '../actions/settings'

import { sortByType } from '../helpers/utilities'

function filteredItems(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case SET_FILTERED_ITEMS:
      return action.items
    case SORT_ITEMS:
      return sortByType(state, action)
    case INIT_SETTINGS:
      return []
    default:
      return state
  }
}

export default filteredItems
