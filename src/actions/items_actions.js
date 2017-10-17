export const SET_ITEMS = 'SET_ITEMS'
export const PREVIOUS_ITEM = 'PREVIOUS_ITEM'
export const NEXT_ITEM = 'NEXT_ITEM'
export const SET_OFFSET = 'SET_OFFSET'
export const CHANGE_OFFSET = 'CHANGE_OFFSET'
export const SET_LIMIT = 'SET_LIMIT'

/*
 * action creators
 */

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  }
}

export function nextItem(filtered, lastItem, limit) {
  return {
    type: NEXT_ITEM,
    filtered,
    lastItem,
    limit,
  }
}

export function previousItem(filtered, firstItem, limit) {
  return {
    type: PREVIOUS_ITEM,
    filtered,
    firstItem,
    limit,
  }
}

export function changeOffset(filtered, offset, limit) {
  return {
    type: CHANGE_OFFSET,
    filtered,
    offset,
    limit,
  }
}

export function setLimit(limit) {
  return {
    type: SET_LIMIT,
    limit,
  }
}

export function setOffset(offset) {
  return {
    type: SET_OFFSET,
    offset,
  }
}
