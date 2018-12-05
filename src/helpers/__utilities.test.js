import { addZeroToNumber } from './utilities'

test('addZeroToNumber', () => {
  expect(addZeroToNumber(1)).toBe('01')
  expect(addZeroToNumber(10)).toBe('10')
})
