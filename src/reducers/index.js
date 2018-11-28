import { combineReducers } from 'redux'

import items from './items'
import currentItems from './currentItems'
import limit from './limit'
import offset from './offset'
import schema from './schema'
import filteredSchema from './filteredSchema'
import searchQuery from './searchQuery'
import filteredItems from './filteredItems'
import settings from './settings'
import tableWidth from './tableWidth'
import lastAction from './lastAction'

export default combineReducers({
  items,
  currentItems,
  limit,
  offset,
  schema,
  searchQuery,
  filteredItems,
  settings,
  tableWidth,
  filteredSchema,
  lastAction,
})
