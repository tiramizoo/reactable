import { combineReducers } from 'redux'

import items from './items'
import filtered from './filtered'

export default combineReducers({
  items,
  filtered,
})
