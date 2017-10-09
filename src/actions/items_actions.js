export const SET_ITEMS = 'SET_ITEMS'
export const PREVIOUS_ITEM = 'PREVIOUS_ITEM'
export const NEXT_ITEM = 'NEXT_ITEM'

/*
 * action creators
 */

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  }
}

export function nextItem(filtered, lastItem) {
  return {
    type: NEXT_ITEM,
    filtered,
    lastItem,
  }
}

export function prevousItem(filtered, firstItem) {
  return {
    type: PREVIOUS_ITEM,
    filtered,
    firstItem,
  }
}
