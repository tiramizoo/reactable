import React from 'react'
import SearchList from './SearchList'

const Control = (props) => {
  const {
    updateViewport, filteredItems, controlShow,
    setLimit, limit, setOffset, offset,
  } = props

  const updateLimit = (e) => {
    const userInput = parseInt(e.target.value, 10)
    const inputValueMin = 1 // min
    const inputValueMax = filteredItems.length // max

    const newLimit = (userInput > inputValueMax) ?
      inputValueMax :
      Math.max(inputValueMin, userInput)
    const newOffset = 0

    setOffset(newOffset)
    setLimit(newLimit)

    updateViewport(filteredItems, newLimit, newOffset)
  }

  const updateOffset = (e) => {
    const userInput = parseInt(e.target.value, 10)

    const inputValueMin = 0 // min
    const inputValueMax = filteredItems.length - limit // max

    const newOffset = (userInput > inputValueMax) ?
      inputValueMax :
      Math.max(inputValueMin, userInput)

    setOffset(newOffset)
    updateViewport(filteredItems, limit, newOffset)
  }
  if (!controlShow) {
    return null
  }
  return (
    <div>
      <div>
        <span> Limit: <input onChange={updateLimit} value={limit} type="number" /></span>
        <span> Offset: <input onChange={updateOffset} value={offset} type="number" /></span>
        <span> displaying records from {offset + 1} to {offset + limit} of {filteredItems.length} </span>
      </div>
      <div>
        <SearchList />
      </div>

    </div>
  )
}

export default Control
