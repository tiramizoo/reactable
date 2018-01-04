import React from 'react'
import SearchText from '../SearchText'

const SearchList = (props) => {
  const { schema } = props

  const getSearchInput = (type, column) => {
    switch (type) {
      case 'text':
        return <SearchText column={column} />
      case 'integer':
      case 'float':
      case 'date':
      case 'boolean':
        return null
      default:
        return null
    }
  }
  return (
    <div>
      { Object.entries(schema).map(([key, keySchema]) => (
        <div key={key}>
          {getSearchInput(keySchema.type, key)}
        </div>
      ))}
    </div>
  )
}

export default SearchList
