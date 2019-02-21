import reducer from './filteredSchema'
import * as types from '../actions/settings'

const initState = {}

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initState)
})

test('should handle INIT_SETTINGS and hide some columns when schema is not loaded', () => {
  expect(reducer(initState,
    {
      type: types.INIT_SETTINGS,
      settings: { schema: { first_name: { type: 'text' }, id: { type: 'number', visible: false } } },
    })
  ).toEqual({
    first_name: { type: 'text' }
  })
})

test('should handle INIT_SETTINGS and do nothing if schema is loaded from localStorage', () => {
  expect(reducer(
    {
      id: { type: 'number' },
    },
    {
      type: types.INIT_SETTINGS,
      settings: { schema: { first_name: { type: 'text' } } },
    })
  ).toEqual({
    id: { type: 'number' },
  })
})
