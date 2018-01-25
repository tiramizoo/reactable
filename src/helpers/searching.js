import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import n from 'numeral'
import moment from 'moment'

// TEXT
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

// BOOLEAN
function searchByBoolean(items, column, searchQuery) {
  const params = searchQuery.params || 'all'
  switch (params) {
    case 'all':
      return items
    case 'true':
      return filter(items, (item) => {
        return item[column] === true
      })
    case 'false':
      return filter(items, (item) => {
        return item[column] === false
      })
    case 'empty':
      return filter(items, (item) => {
        return item[column] !== true && item[column] !== false
      })
    case 'notEmpty':
      return filter(items, (item) => {
        return item[column] === true || item[column] === false
      })
    default:
      return []
  }
}

// INTEGER
function searchByInteger(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = n(item[column]).value()
        return itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, (item) => {
        return n(item[column]).value() >= searchQuery.value.from
      })
    }
    if (searchQuery.value.to) {
      return filter(items, (item) => {
        return n(item[column]).value() <= searchQuery.value.to
      })
    }
  }

  return items
}


// DATE
function searchByDate(items, column, searchQuery) {
  if (searchQuery.value) {
    if (searchQuery.value.from && searchQuery.value.to) {
      return filter(items, (item) => {
        const itemValue = moment(item[column])
        return itemValue >= searchQuery.value.from && itemValue <= searchQuery.value.to
      })
    }
    if (searchQuery.value.from) {
      return filter(items, (item) => {
        return moment(item[column]) >= searchQuery.value.from
      })
    }
    if (searchQuery.value.to) {
      return filter(items, (item) => {
        return moment(item[column]) <= searchQuery.value.to
      })
    }
  }

  return items
}

function searchByType(items, type, column, searchQuery) {
  switch (type) {
    case 'text':
      return searchByText(items, column, searchQuery)
    case 'boolean':
      return searchByBoolean(items, column, searchQuery)
    case 'integer':
      return searchByInteger(items, column, searchQuery)
    case 'date':
      return searchByDate(items, column, searchQuery)
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
