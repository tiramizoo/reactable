import { SET_ITEMS, NEXT_ITEM, PREVIOUS_ITEM, CHANGE_OFFSET } from '../actions/items_actions'

function current_items(state = [], action) {
  let limit = null
  switch (action.type) {
    case SET_ITEMS:
      return action.items.slice(0,20)
    case NEXT_ITEM:
      limit = parseInt(action.limit)
      const lastIndex = action.filtered.indexOf(action.lastItem)
      if (lastIndex + 1 === action.filtered.length) {
        return action.filtered.slice(lastIndex - (limit - 1), lastIndex + 1)
      }
      return action.filtered.slice(lastIndex - (limit - 2), lastIndex + 2)
    case PREVIOUS_ITEM:
      limit = parseInt(action.limit)
      const firstIndex = action.filtered.indexOf(action.firstItem)
      if (firstIndex === 0) {
        return action.filtered.slice(0, limit)
      }
      return action.filtered.slice(firstIndex - 1, firstIndex + (limit - 1))
    case CHANGE_OFFSET:
      limit = parseInt(action.limit)
      const offset = parseInt(action.offset)
      return action.filtered.slice(offset, offset + limit)
    default:
      return state
  }
}

export default current_items
