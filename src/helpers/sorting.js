import _ from 'lodash'

export function sortByText(array, key, direction) {
  return _.orderBy(array, [key], [direction]);
}


function compareDesc(key) {
  return (a, b) => {
    if (a[key] < b[key]) return 1
    if (a[key] > b[key]) return -1
    return 0
  }
}
function compareAsc(key) {
  return (a, b) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  }
}

export function sortBy(array, key, direction) {
  if (direction === 'desc') {
    return array.sort(compareDesc(key))
  }
  return array.sort(compareAsc(key))
}

export function sortByType(state, action) {
  switch (action.columnType) {
    case 'text':
      return sortByText(state, action.column, action.direction)
    case 'integer':
    case 'float':
    case 'boolean':
    case 'date':
    case 'time':
    case 'datetime':
      return sortBy(state, action.column, action.direction)
    default:
      return state
  }
}
