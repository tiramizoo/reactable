export const SET_ITEMS = 'SET_ITEMS'
export const SET_OFFSET = 'SET_OFFSET'
export const SET_LIMIT = 'SET_LIMIT'
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT'
export const SORT_ITEMS = 'SORT_ITEMS'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS'

export function setSearchQuery(column, query) {
  return {
    type: SET_SEARCH_QUERY,
    column,
    query,
  }
}

export function setFilteredItems(items) {
  return {
    type: SET_FILTERED_ITEMS,
    items,
  }
}

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
    offset,
  }
}

export function sortItems(column, columnType, direction) {
  return {
    type: SORT_ITEMS,
    column,
    direction,
    columnType,
  }
}
