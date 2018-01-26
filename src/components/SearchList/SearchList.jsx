import React from 'react'
import SearchText from '../SearchText'
import SearchBoolean from '../SearchBoolean'
import SearchInteger from '../SearchInteger'
import SearchDate from '../SearchDate'
import SearchDateTime from '../SearchDateTime'

const SearchList = (props) => {
  const { schema } = props

  const getSearchInput = (type, column) => {
    switch (type) {
      case 'text':
        return <SearchText column={column} />
      case 'boolean':
        return <SearchBoolean column={column} />
      case 'integer':
        return <SearchInteger column={column} />
      case 'float':
        return <SearchInteger column={column} />
      case 'date':
        return <SearchDate column={column} />
      case 'datetime':
        return <SearchDateTime column={column} />
      case 'time':
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
