function compareTextDesc(key) {
  return (a, b) => {
    const x = a[key].toLowerCase()
    const y = b[key].toLowerCase()
    if (x < y) return 1
    if (x > y) return -1
    return 0
  }
}
function compareTextAsc(key) {
  return (a, b) => {
    const x = a[key].toLowerCase()
    const y = b[key].toLowerCase()
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
