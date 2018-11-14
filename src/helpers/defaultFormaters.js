export const defaultFormatter = (type, key) => {
  switch (type) {
    case 'text':
      return row => row[key].toString()
    case 'boolean':
      return (row) => {
        if (row[key]) {
          return '&#10003;'
        }
        return '&#10007;'
      }
    case 'integer':
      return row => row[key].toString()
    case 'float':
      return row => row[key].toString()
    case 'date':
      return row => row[key].toString()
    case 'datetime':
      return row => row[key].toString()
    case 'time':
      return null
    default:
      return null
  }
}

export const abc = () => {
  return null
}
