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

  const columnHeader = (key) => {
    const schemaParams = schema[key]

    if ((schemaParams['filter'] != 'undefined' && schemaParams['filter'] == false) || (schemaParams['hide'] != 'undefined' && schemaParams['hide'] == true)) {
      return null
    }
    return <col key={key} width={schema[key]['width']}></col>
  }

  const columnBody = (key, schemaParams) => {
    if ((schemaParams['filter'] != 'undefined' && schemaParams['filter'] == false) || (schemaParams['hide'] != 'undefined' && schemaParams['hide'] == true)) {
      return null
    }
    return <td key={key}>{getSearchInput(schemaParams.type, key)}</td>
  }

  return (
    <div>
      <table>
        { Object.keys(schema).map(key =>
            columnHeader(key),
        )}
        <tbody>
          <tr>
            { Object.entries(schema).map(([key, keySchema]) =>
              columnBody(key, keySchema),
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SearchList
