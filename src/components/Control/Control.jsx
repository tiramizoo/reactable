import React from 'react'

const Control = (props) => {
  const {
    items, updateViewport,
    setLimit, limit, setOffset, offset,
  } = props

  const updateLimit = (e) => {
    let userInput     = parseInt(e.target.value, 10)
    let inputValueMin = 1 // min
    let inputValueMax = items.length // max

    let newLimit = (userInput > inputValueMax) ? inputValueMax : Math.max(inputValueMin, userInput)
    let newOffset = 0

    setOffset(newOffset)
    setLimit(newLimit)

    updateViewport(items, newLimit, newOffset)
  }

  const updateOffset = (e) => {
    let userInput     = parseInt(e.target.value, 10)

    let inputValueMin = 0 // min
    let inputValueMax = items.length - limit // max

    let newOffset = (userInput > inputValueMax) ? inputValueMax : Math.max(inputValueMin, userInput)

    setOffset(newOffset)
    updateViewport(items, limit, newOffset)
  }

  return (
    <div>
      <p>
        <span> Limit: <input onChange={updateLimit} value={limit} type='number' /></span>
        <span> Offset: <input onChange={updateOffset} value={offset} type='number' /></span>
        <span> displaying records from {offset + 1} to {offset + limit} of {items.length} </span>
      </p>

    </div>
  )
}

export default Control
