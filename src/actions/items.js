export const SET_ITEMS = 'SET_ITEMS'
export const SET_OFFSET = 'SET_OFFSET'
export const SET_LIMIT = 'SET_LIMIT'
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_SEARCH_QUERY_OR = 'SET_SEARCH_QUERY_OR'
export const SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS'
export const CLEAR_ALL = 'CLEAR_ALL'

export function clearSearchQuery() {
  return {
    type: CLEAR_ALL,
  }
}

export function setSearchQuery(column, query) {
  return {
    type: SET_SEARCH_QUERY,
    column,
    query,
  }
}

export function setSearchQueryOr(column, query) {
  return {
    type: SET_SEARCH_QUERY_OR,
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
