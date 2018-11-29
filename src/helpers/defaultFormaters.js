export const defaultFormatter = (type, key) => {
  switch (type) {
    case 'boolean':
      return (value, row) => {
        if (value === true) {
          return '●'
        } else if (value === false) {
          return '○'
        }
      }
    default:
      return (value, row) => value
  }
}
