import {
  updateViewport, setSearchQueryAnd, setFilteredItems, setOffset, clearSearchQuery,
  setSearchQueryOr,
} from './items'
import { mergeSearchQuery, searchBy } from '../helpers/utilities'

export const searchingBy = ({ query, store, type }) => {
  const {
    items, schema, limit, searchQueryAnd, searchQueryOr, settings,
  } = store.getState()
  const { strategySearch } = settings
  let filteredItems = []
  let newSearchQuery = []

  if (type === 'or') {
    // OR
    newSearchQuery = mergeSearchQuery(query, searchQueryOr)
    filteredItems = searchBy(items, searchQueryAnd, newSearchQuery, schema, strategySearch)
    store.dispatch(setSearchQueryOr(newSearchQuery))
  } else {
    // AND
    newSearchQuery = mergeSearchQuery(query, searchQueryAnd)
    filteredItems = searchBy(items, newSearchQuery, searchQueryOr, schema, strategySearch)
    store.dispatch(setSearchQueryAnd(newSearchQuery))
  }

  store.dispatch(setFilteredItems(filteredItems))
  store.dispatch(setOffset(0))
  store.dispatch(updateViewport(filteredItems, limit, 0))
}

export const searchingAnd = ({ query, store }) => {
  searchingBy({ query, store, type: 'and' })
}

export const searchingOr = ({ query, store }) => {
  searchingBy({ query, store, type: 'or' })
}

export const reSearching = items => (dispatch, getState) => {
  const {
    limit, searchQueryAnd, searchQueryOr, settings, schema,
  } = getState()
  const { strategySearch } = settings
  const filteredItems = searchBy(items, searchQueryAnd, searchQueryOr, schema, strategySearch)

  dispatch(setFilteredItems(filteredItems))
  dispatch(setOffset(0))
  dispatch(updateViewport(filteredItems, limit, 0))
}

export const clearAllSearchQuery = () => (dispatch, getState) => {
  const { items, limit } = getState()

  dispatch(clearSearchQuery())
  dispatch(setFilteredItems(items))
  dispatch(setOffset(0))
  dispatch(updateViewport(items, limit, 0))
}
