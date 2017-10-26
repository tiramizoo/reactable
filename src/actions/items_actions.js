export const SET_ITEMS       = 'SET_ITEMS'
export const SET_OFFSET      = 'SET_OFFSET'
export const SET_LIMIT       = 'SET_LIMIT'
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT'

/*
 * action creators
 */

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
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

export function updateViewport(items, limit, offset) {
  return {
    type: UPDATE_VIEWPORT,
    items,
    limit,
    offset
  }
}
