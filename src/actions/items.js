export const SET_ITEMS = 'SET_ITEMS'
export const SET_SORT_ITEMS = 'SET_SORT_ITEMS'
export const SET_OFFSET = 'SET_OFFSET'
export const SET_LIMIT = 'SET_LIMIT'
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT'
export const SET_SEARCH_QUERY_AND = 'SET_SEARCH_QUERY_AND'
export const SET_SEARCH_QUERY_OR = 'SET_SEARCH_QUERY_OR'
export const SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS'
export const CLEAR_ALL = 'CLEAR_ALL'
export const CLEAR_ITEMS = 'CLEAR_ITEMS'

export function clearSearchQuery() {
  return {
    type: CLEAR_ALL,
  }
}

export function clearItems() {
  return {
    type: CLEAR_ITEMS,
  }
}

export function setSearchQueryAnd(query) {
  return {
    type: SET_SEARCH_QUERY_AND,
    query,
  }
}

export function setSearchQueryOr(query) {
  return {
    type: SET_SEARCH_QUERY_OR,
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
export function setSortItems(items) {
  return {
    type: SET_SORT_ITEMS,
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
