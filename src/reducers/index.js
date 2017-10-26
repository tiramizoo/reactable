import { combineReducers } from 'redux'

import items from './items'
import current_items from './current_items'
import limit from './limit'
import offset from './offset'

export default combineReducers({
  items,
  current_items,
  limit,
  offset
})
