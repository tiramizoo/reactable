function compareTextDesc(key) {
  return (a, b) => {
    if (!a[key] || !b[key]) {
      return 1
    }
    const x = a[key].toString().toLowerCase()
    const y = b[key].toString().toLowerCase()
    if (x < y) return 1
    if (x > y) return -1
    return 0
  }
}
function compareTextAsc(key) {
  return (a, b) => {
    if (!a[key] || !b[key]) {
      return -1
    }
    const x = a[key].toString().toLowerCase()
    const y = b[key].toString().toLowerCase()
    if (x > y) return 1
    if (x < y) return -1
    return 0
  }
}

export function sortByText(array, key, direction) {
  if (direction === 'desc') {
    return array.sort(compareTextDesc(key))
  }
  return array.sort(compareTextAsc(key))
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
