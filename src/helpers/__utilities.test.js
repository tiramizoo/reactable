import { addZeroToNumber, searchByBoolean } from './utilities'

test('addZeroToNumber', () => {
  expect(addZeroToNumber(1)).toBe('01')
  expect(addZeroToNumber(10)).toBe('10')
})

// Search
const items = [
  {
    id: 1,
    first_name: 'Chloe',
    last_name: 'Sipes',
    date_of_birth: '2006-12-20',
    solary: 305,
    active: true,
  },
  {
    id: 2,
    first_name: 'Harrison',
    last_name: 'Oga',
    date_of_birth: '2000-10-20',
    solary: 1900,
    active: true,
  },
  {
    id: 3,
    first_name: null,
    last_name: 'James',
    date_of_birth: '1980-02-15',
    solary: 3000,
    active: null,
  },
  {
    id: 4,
    first_name: 'Lebron',
    last_name: 'James',
    date_of_birth: '1980-02-20',
    solary: 3400,
    active: false,
  },
  {
    id: 5,
    first_name: 'Luka',
    last_name: 'Doncic',
    date_of_birth: '1999-02-15',
    solary: null,
    active: null,
  },
  {
    id: 6,
    first_name: 'Marcin',
    last_name: 'Gortat',
    date_of_birth: '1979-02-15',
    solary: null,
    active: true,
  },
]

test('searchByBoolean', () => {
  const column = 'active'
  let searchQuery = { value: 'true' }
  expect(searchByBoolean(items, column, searchQuery).length).toBe(3)

  searchQuery = { value: 'false' }
  expect(searchByBoolean(items, column, searchQuery).length).toBe(1)

  searchQuery = { value: 'all' }
  expect(searchByBoolean(items, column, searchQuery).length).toBe(6)

  searchQuery = { value: 'empty' }
  expect(searchByBoolean(items, column, searchQuery).length).toBe(2)

  searchQuery = { value: 'notEmpty' }
  expect(searchByBoolean(items, column, searchQuery).length).toBe(4)
})
