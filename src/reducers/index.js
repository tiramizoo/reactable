import { combineReducers } from 'redux'

import items from './items'
import currentItems from './currentItems'
import limit from './limit'
import offset from './offset'
import schema from './schema'
import search from './search'
import filteredItems from './filteredItems'

export default combineReducers({
  items,
  currentItems,
  limit,
  offset,
  schema,
  search,
  filteredItems,
})
