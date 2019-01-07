import reducer from './table'
import * as types from '../actions/settings'

const initState = {
  width: 1000,
  rows: 30,
  rowHeight: 30,
}

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initState)
})

test('should handle INIT_SETTINGS with overwrite init state', () => {
  expect(reducer(undefined,
    {
      type: types.INIT_SETTINGS,
      rows: 5,
    })
  ).toEqual({
    width: 1000,
    rows: 5,
    rowHeight: 30,
  })

  expect(reducer(undefined,
    {
      type: types.INIT_SETTINGS,
      tableWidth: 300,
    })
  ).toEqual({
    width: 300,
    rows: 30,
    rowHeight: 30,
  })

  expect(reducer(undefined,
    {
      type: types.INIT_SETTINGS,
      rowHeight: 100,
    })
  ).toEqual({
    width: 1000,
    rows: 30,
    rowHeight: 100,
  })
})

test('should handle UPDATE_TABLE_WIDTH', () => {
  expect(reducer(initState,
    {
      type: types.UPDATE_TABLE_WIDTH,
      width: 300,
    })
  ).toEqual({
    width: 300,
    rows: 30,
    rowHeight: 30,
  })
})

test('should handle UPDATE_ROW_HEIGHT', () => {
  expect(reducer(initState,
    {
      type: types.UPDATE_ROW_HEIGHT,
      height: 300,
    })
  ).toEqual({
    width: 1000,
    rows: 30,
    rowHeight: 300,
  })
})

test('should handle UPDATE_ROWS_NUMBER', () => {
  expect(reducer(initState,
    {
      type: types.UPDATE_ROWS_NUMBER,
      rows: 5,
    })
  ).toEqual({
    width: 1000,
    rows: 5,
    rowHeight: 30,
  })
})
