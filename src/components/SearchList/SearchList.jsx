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
      case 'datetime':
      case 'time':
      case 'boolean':
        return null
      default:
        return null
    }
  }
  return (
    <div>
      <table style={{ width: 1920 }}>
        { Object.keys(schema).map(key =>
            <col key={key} width={schema[key]['width']}></col>,
        )}
        <tbody>
          <tr>
            { Object.entries(schema).map(([key, keySchema]) =>
              <td key={key}>{getSearchInput(keySchema.type, key)}</td>,
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SearchList
