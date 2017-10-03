export const SET_ITEMS = 'SET_ITEMS'

/*
 * action creators
 */

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  }
}
