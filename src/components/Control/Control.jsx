import React from 'react'

const Control = (props) => {
  const {
    items, updateViewport,
    setLimit, limit, setOffset, offset,
  } = props

  const updateLimit = (e) => {
    const userInput = parseInt(e.target.value, 10)
    const inputValueMin = 1 // min
    const inputValueMax = items.length // max

    const newLimit = (userInput > inputValueMax) ?
      inputValueMax :
      Math.max(inputValueMin, userInput)
    const newOffset = 0

    setOffset(newOffset)
    setLimit(newLimit)

    updateViewport(items, newLimit, newOffset)
  }

  const updateOffset = (e) => {
    const userInput = parseInt(e.target.value, 10)

    const inputValueMin = 0 // min
    const inputValueMax = items.length - limit // max

    const newOffset = (userInput > inputValueMax) ?
      inputValueMax :
      Math.max(inputValueMin, userInput)

    setOffset(newOffset)
    updateViewport(items, limit, newOffset)
  }

  return (
    <div>
      <p>
        <span> Limit: <input onChange={updateLimit} value={limit} type="number" /></span>
        <span> Offset: <input onChange={updateOffset} value={offset} type="number" /></span>
        <span> displaying records from {offset + 1} to {offset + limit} of {items.length} </span>
      </p>

    </div>
  )
}

export default Control
