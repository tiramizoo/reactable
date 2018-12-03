import React from 'react'
import SearchList from './SearchList'

const SearchControl = (props) => {
  const {
    controlShow,
    tableWidth,
  } = props

  if (!controlShow) {
    return null
  }
  return (
    <div className="control" style={{width: tableWidth}}>
      <div>
        <SearchList />
      </div>

    </div>
  )
}

export default SearchControl
