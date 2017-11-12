function compareTextDesc(key) {
  return (a, b) => {
    if (a[key] < b[key]) return 1
    if (a[key] > b[key]) return -1
    return 0
  }
}
function compareTextAsc(key) {
  return (a, b) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  }
}

export function sortByText(array, key, direction) {
  if (direction === 'desc') {
    return array.sort(compareTextDesc(key))
  }
  return array.sort(compareTextAsc(key))
}


export function sortByFloat(array, key, direction) {
  return {}
}
