import { SET_ITEMS, NEXT_ITEM, PREVIOUS_ITEM } from '../actions/items_actions'

function current_items(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items.slice(0,20)
    case NEXT_ITEM:
      const lastIndex = action.filtered.indexOf(action.lastItem)
      if (lastIndex + 1 === action.filtered.length) {
        return action.filtered.slice(lastIndex - 19, lastIndex + 1)
      }
      return action.filtered.slice(lastIndex - 18, lastIndex + 2)
    case PREVIOUS_ITEM:
      const firstIndex = action.filtered.indexOf(action.firstItem)
      if (firstIndex === 0) {
        return action.filtered.slice(0,20)
      }
      return action.filtered.slice(firstIndex - 1, firstIndex + 19)
    default:
      return state
  }
}

export default current_items
