import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

function searchByText(items, column, searchQuery) {
  const params = searchQuery.params || 'all'
  switch (params) {
    case 'all':
      if (searchQuery.value) {
        return filter(items, (item) => {
          return item[column].toLowerCase().includes(searchQuery.value.toLowerCase())
        })
      }
      return items
    case 'exact':
      return filter(items, (item) => {
        return item[column] === searchQuery.value
      })
    case 'empty':
      return filter(items, (item) => {
        return isEmpty(item[column])
      })
    case 'notEmpty':
      return filter(items, (item) => {
        return !isEmpty(item[column])
      })
    default:
      return []
  }
}

function searchByType(items, type, column, searchQuery) {
  switch (type) {
    case 'text':
      return searchByText(items, column, searchQuery)
    default:
      return []
  }
}

export default function searching(items, search, schema) {
  let filteredItems = items
  Object.entries(search).map(([column, searchQuery]) => {
    filteredItems = searchByType(filteredItems, schema[column].type, column, searchQuery)
    return filteredItems
  })
  return filteredItems
}
