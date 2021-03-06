import { combineReducers } from 'redux'

import items from './items'
import currentItems from './currentItems'
import limit from './limit'
import offset from './offset'
import schema from './schema'
import filteredSchema from './filteredSchema'
import searchQueryAnd from './searchQueryAnd'
import filteredItems from './filteredItems'
import selectedItems from './selectedItems'
import settings from './settings'
import table from './table'
import lastAction from './lastAction'
import searchQueryOr from './searchQueryOr'
import searchPresets from './searchPresets'

export default combineReducers({
  items,
  currentItems,
  limit,
  offset,
  schema,
  searchQueryAnd,
  filteredItems,
  settings,
  table,
  filteredSchema,
  lastAction,
  searchQueryOr,
  searchPresets,
  selectedItems,
})
