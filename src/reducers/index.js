import { combineReducers } from 'redux'

import items from './items'
import filtered from './filtered'
import current_items from './current_items'

export default combineReducers({
  items,
  filtered,
  current_items,
})
