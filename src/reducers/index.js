import { combineReducers } from 'redux'

import items from './items'
import currentItems from './currentItems'
import limit from './limit'
import offset from './offset'

export default combineReducers({
  items,
  currentItems,
  limit,
  offset,
})
